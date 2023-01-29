import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    login: {
      currentUser: null,
      isFetching: false,
      error: false,
    },
    register: {
      isFetching: false,
      error: false,
      message: '',
    },
    logout: {
      isFetching: false,
      error: false,
      success: false,
      message: '',
    },
    updatePassword: {
      isFetching: false,
      success: false,
      error: false,
      message: '',
    },
    updateInfo: {
      isFetching: false,
      success: false,
      error: false,
      message: '',
    },
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, actions) => {
      state.login.isFetching = false;
      state.login.currentUser = actions.payload;
      state.login.error = false;
    },
    loginError: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },

    registerStart: (state) => {
      state.register.isFetching = true;
      state.register.message = '';
    },
    registerSuccess: (state) => {
      state.register.isFetching = false;
      state.register.error = false;
      state.register.message = '';
    },
    registerError: (state, actions) => {
      state.register.error = true;
      state.register.isFetching = false;
      state.register.message = actions.payload.message;
    },
    clearMsgRegister: (state) => {
      state.register.isFetching = false;
      state.register.error = false;
      state.register.message = '';
    },

    logoutStart: (state) => {
      state.logout.isFetching = true;
    },
    logoutSuccess: (state) => {
      state.login.currentUser = null;
      state.logout.isFetching = false;
      state.logout.success = true;
      state.logout.error = false;
    },
    logoutError: (state) => {
      state.logout.isFetching = false;
      state.logout.error = true;
      state.logout.success = false;
    },

    updatePasswordStart: (state) => {
      state.updatePassword.isFetching = true;
    },
    updatePasswordSuccess: (state, actions) => {
      state.updatePassword.isFetching = false;
      state.updatePassword.success = true;
      state.updatePassword.error = false;
      state.updatePassword.message = actions.payload;
    },
    updatePasswordError: (state, actions) => {
      state.updatePassword.isFetching = false;
      state.updatePassword.success = false;
      state.updatePassword.error = true;
      state.updatePassword.message = actions.payload;
    },
    updatePasswordReset: (state) => {
      state.updatePassword.isFetching = false;
      state.updatePassword.success = false;
      state.updatePassword.error = false;
      state.updatePassword.message = '';
    },

    updateInfoStart: (state) => {
      state.updateInfo.isFetching = true;
    },
    updateInfoSuccess: (state, actions) => {
      const updatedUser = actions.payload;
      const currentUser = state.login.currentUser;
      state.updateInfo.isFetching = false;
      state.updateInfo.success = true;
      state.updateInfo.error = false;
      state.updateInfo.message = 'Update successfully';
      state.login.currentUser = {
        ...currentUser,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
        roles: updatedUser.roles,
      };
    },
    updateInfoError: (state, actions) => {
      state.updateInfo.isFetching = false;
      state.updateInfo.success = false;
      state.updateInfo.error = true;
      state.updateInfo.message = actions.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginError,
  registerStart,
  registerSuccess,
  registerError,
  clearMsgRegister,
  logoutStart,
  logoutSuccess,
  logoutError,
  updatePasswordStart,
  updatePasswordSuccess,
  updatePasswordError,
  updatePasswordReset,
  updateInfoStart,
  updateInfoSuccess,
  updateInfoError,
} = authSlice.actions;

export default authSlice.reducer;
