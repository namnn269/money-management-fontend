import { createSlice } from '@reduxjs/toolkit';

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    page: { list: [], totalPages: 1 },
    post: { isFetching: false, success: false, error: false, message: '' },
    update: { isFetching: false, success: false, error: false, message: '' },
    getTrans: { isFetching: false, success: false, error: false, message: '' },
    delete: { isFetching: false, success: false, error: false, message: '' },
  },
  reducers: {
    postTransStart: (state) => {
      state.post.isFetching = true;
      state.post.success = false;
      state.post.error = false;
      state.post.message = '';
    },
    postTransSuccess: (state, actions) => {
      state.post.isFetching = false;
      state.post.success = true;
      state.post.error = false;
      state.post.message = 'Save transaction successfully';
    },
    postTransError: (state, actions) => {
      state.post.isFetching = false;
      state.post.success = false;
      state.post.error = true;
      state.post.message = actions.payload.message;
    },

    updateTransStart: (state) => {
      state.update.isFetching = true;
      state.update.success = false;
      state.update.error = false;
    },
    updateTransSuccess: (state, actions) => {
      state.update.isFetching = true;
      state.update.success = false;
      state.update.error = false;
      state.update.message = 'Update successfully';
      const index = state.page.list.findIndex(
        (trans) => trans.id === actions.payload.id
      );
      state.page.list.splice(index, 1, actions.payload);
    },
    updateTransError: (state) => {
      state.update.isFetching = false;
      state.update.success = false;
      state.update.error = true;
    },

    getTransStart: (state) => {
      state.getTrans.isFetching = true;
      state.getTrans.success = false;
      state.getTrans.error = false;
    },
    getTransSuccess: (state, actions) => {
      state.getTrans.isFetching = false;
      state.getTrans.success = true;
      state.getTrans.error = false;
      state.page.list = actions.payload.list;
      state.page.totalPages = actions.payload.totalPages;
    },
    getTransError: (state) => {
      state.getTrans.isFetching = false;
      state.getTrans.success = false;
      state.getTrans.error = true;
    },

    deleteTransStart: (state) => {
      state.delete.isFetching = true;
      state.delete.success = false;
      state.delete.error = false;
    },

    deleteTransSuccess: (state, actions) => {
      state.delete.isFetching = false;
      state.delete.success = true;
      state.delete.error = false;
      if (actions.payload.categoryId)
        state.page.list = state.page.list.filter(
          (trans) => trans.categoryId !== actions.payload.categoryId
        );

      if (actions.payload.id)
        state.page.list = state.page.list.filter(
          (trans) => trans.id !== actions.payload.id
        );
    },

    deleteTransError: (state, actions) => {
      state.delete.isFetching = false;
      state.delete.success = false;
      state.delete.error = true;
    },

    deleteAllTransactions: (state) => {
      state.delete.isFetching = false;
      state.delete.success = false;
      state.delete.error = false;
      state.page = { list: [], totalPages: 1 };
    },
  },
});

export default transactionSlice.reducer;
export const {
  postTransStart,
  postTransSuccess,
  postTransError,
  updateTransStart,
  updateTransSuccess,
  updateTransError,
  getTransStart,
  getTransSuccess,
  getTransError,
  deleteTransStart,
  deleteTransSuccess,
  deleteTransError,
  deleteAllTransactions,
} = transactionSlice.actions;
