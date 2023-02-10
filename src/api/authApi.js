import axios from 'axios';
import { deleteAllCategories } from '~/redux/categorySlice';
import { deleteAllTransactions } from '~/redux/transactionSlice';
import createAxiosJwt from './axiosClient';

const {
  loginStart,
  loginSuccess,
  loginError,
  registerStart,
  registerSuccess,
  registerError,
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
  registerClear,
} = require('~/redux/authSlice');

const timeToReset = 10000;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const authApi = {
  login: async (usernamePass, dispatch, navigate) => {
    dispatch(loginStart());
    try {
      const res = await axios.post('/auth/login', usernamePass, {
        baseURL: process.env.REACT_APP_API_URL,
      });
      dispatch(loginSuccess(res.data));
      navigate('/');
    } catch (error) {
      dispatch(loginError());
    }
  },

  register: async (data, dispatch) => {
    dispatch(registerStart());
    try {
      const res = await axios.post('/auth/signup', data, {
        baseURL: process.env.REACT_APP_API_URL,
      });
      dispatch(registerSuccess(res.data));
      return true;
    } catch (error) {
      dispatch(registerError(error.response.data));
    } finally {
      setTimeout(() => {
        dispatch(registerClear());
      }, timeToReset);
    }
  },

  logout: async (user, dispatch, navigate) => {
    dispatch(logoutStart());
    try {
      const logoutRes = await axios.post(
        '/auth/logout',
        { refreshToken: user.refreshToken },
        { baseURL: process.env.REACT_APP_API_URL }
      );
      console.log(logoutRes);
      dispatch(logoutSuccess());
      dispatch(deleteAllCategories());
      dispatch(deleteAllTransactions());
      localStorage.clear();
      navigate('/login');
    } catch (error) {
      dispatch(logoutError());
    }
  },

  updatePassword: async (data, user, dispatch) => {
    dispatch(updatePasswordStart());
    const axiosJwt = createAxiosJwt(user, dispatch);
    try {
      const res = await axiosJwt.post('/auth/updatePassword', data);
      dispatch(updatePasswordSuccess(res));
    } catch (error) {
      console.log(error);
      dispatch(updatePasswordError(error.response.data));
    }
    setTimeout(() => {
      dispatch(updatePasswordReset());
    }, timeToReset);
  },

  updateInfo: async (data, user, dispatch) => {
    dispatch(updateInfoStart());
    const axiosJwt = createAxiosJwt(user, dispatch);
    try {
      const updatedUser = await axiosJwt.post('/auth/updateInfo', data);
      dispatch(updateInfoSuccess(updatedUser));
      console.log(updatedUser);
    } catch (error) {
      console.log(error);
      dispatch(updateInfoError(error?.response?.data));
    }
  },

  verifyEmail: async (email, user, dispatch) => {
    dispatch(verifyEmailStart());
    const axiosJwt = createAxiosJwt(user, dispatch);
    try {
      const res = await axiosJwt.post(
        '/auth/verifyEmail',
        {},
        { params: { email } }
      );
      console.log(res);
      dispatch(verifyEmailSuccess(res));
    } catch (error) {
      console.log(error);
      dispatch(verifyEmailError(error.response.data));
    } finally {
      setTimeout(() => {
        dispatch(verifyEmailReset());
      }, timeToReset);
    }
  },

  resetPassword: async (data, dispatch, navigate) => {
    dispatch(resetPasswordStart());
    try {
      const res = await axios.post(
        '/auth/resetPassword',
        {},
        { baseURL: process.env.REACT_APP_API_URL, params: data }
      );
      console.log(res);
      dispatch(resetPasswordSuccess(res.data));
    } catch (error) {
      console.log(error);
      dispatch(resetPasswordError(error.response.data));
    } finally {
      setTimeout(() => {
        dispatch(resetPasswordClear());
      }, timeToReset);
    }
  },
};

export default authApi;
