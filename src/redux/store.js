import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  createStateSyncMiddleware,
  initMessageListener,
  initStateWithPrevTab,
  withReduxStateSync,
} from 'redux-state-sync';

import authReducer from '~/redux/authSlice';
import categorySlice from '~/redux/categorySlice';
import transactionSlice from './transactionSlice';

const rootReducer = withReduxStateSync(
  combineReducers({
    auth: authReducer,
    categories: categorySlice,
    transactions: transactionSlice,
  })
);

const persistConfig = { key: 'root', version: 1, storage };

const persistedReducer = persistReducer(persistConfig, rootReducer);

const config = {
  blacklist: ['persist/PERSIST', 'persist/REHYDRATE'],
};
const middlewares = [createStateSyncMiddleware(config)];

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middlewares),
});

initMessageListener(store);
initStateWithPrevTab(store);
const persistor = persistStore(store);

export { store, persistor };
