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
      success: false,
      error: false,
      message: '',
    },
    logout: {
      isFetching: false,
      error: false,
      success: false,
      message: '',
    },
    updateInfo: {
      isFetching: false,
      success: false,
      error: false,
      message: '',
    },
    verifyEmail: {
      isFetching: false,
      success: false,
      error: false,
      message: '',
    },
    updatePassword: {
      isFetching: false,
      success: false,
      error: false,
      message: '',
    },
    resetPassword: {
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
    //////////////////////////////////////////
    registerStart: (state) => {
      state.register.isFetching = true;
    },
    registerSuccess: (state, actions) => {
      state.register.isFetching = false;
      state.register.success = true;
      state.register.error = false;
      state.register.message = actions.payload.message;
    },
    registerError: (state, actions) => {
      state.register.isFetching = false;
      state.register.success = false;
      state.register.error = true;
      state.register.message = actions.payload.message;
    },
    registerClear: (state) => {
      state.register.isFetching = false;
      state.register.success = false;
      state.register.error = false;
      state.register.message = '';
    },
    //////////////////////////////////////////
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
    //////////////////////////////////////////
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
    //////////////////////////////////////////
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
      state.login.currentUser = { ...currentUser, ...updatedUser };
    },
    updateInfoError: (state, actions) => {
      state.updateInfo.isFetching = false;
      state.updateInfo.success = false;
      state.updateInfo.error = true;
      state.updateInfo.message = actions.payload;
    },
    //////////////////////////////////////////
    verifyEmailStart: (state) => {
      state.verifyEmail.isFetching = true;
    },
    verifyEmailSuccess: (state, actions) => {
      state.verifyEmail.isFetching = false;
      state.verifyEmail.success = true;
      state.verifyEmail.error = false;
      state.verifyEmail.message = actions.payload;
    },
    verifyEmailError: (state, actions) => {
      state.verifyEmail.isFetching = false;
      state.verifyEmail.success = false;
      state.verifyEmail.error = true;
      state.verifyEmail.message = actions.payload;
    },
    verifyEmailReset: (state) => {
      state.verifyEmail.isFetching = false;
      state.verifyEmail.success = false;
      state.verifyEmail.error = false;
      state.verifyEmail.message = '';
    },
    ////////////////////////////////////////////
    resetPasswordStart: (state) => {
      state.resetPassword.isFetching = true;
    },
    resetPasswordSuccess: (state, actions) => {
      state.resetPassword.isFetching = false;
      state.resetPassword.success = true;
      state.resetPassword.error = false;
      state.resetPassword.message = actions.payload;
    },
    resetPasswordError: (state, actions) => {
      state.resetPassword.isFetching = false;
      state.resetPassword.success = false;
      state.resetPassword.error = true;
      state.resetPassword.message = actions.payload;
    },
    resetPasswordClear: (state) => {
      state.resetPassword.isFetching = false;
      state.resetPassword.success = false;
      state.resetPassword.error = false;
      state.resetPassword.message = '';
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
  registerClear,
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
  verifyEmailStart,
  verifyEmailSuccess,
  verifyEmailError,
  verifyEmailReset,
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordError,
  resetPasswordClear,
} = authSlice.actions;

export default authSlice.reducer;
