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
} = require('~/redux/authSlice');

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const authApi = {
  login: async (usernamePass, dispatch, navigate) => {
    dispatch(loginStart());
    try {
      const res = await axios.post('/auth/login', usernamePass, {
        baseURL: process.env.REACT_APP_API_URL,
      });
      navigate('/');
      dispatch(loginSuccess(res.data));
    } catch (error) {
      dispatch(loginError());
    }
  },

  register: async (data, dispatch, navigate) => {
    dispatch(registerStart());
    try {
      const res = await axios.post('/auth/signup', data, {
        baseURL: process.env.REACT_APP_API_URL,
      });
      dispatch(registerSuccess());
      navigate('/login');
      return res;
    } catch (error) {
      dispatch(registerError(error.response.data));
    }
  },

  logout: async (user, dispatch, navigate) => {
    dispatch(logoutStart());
    const axiosJwt = createAxiosJwt(user, dispatch);
    try {
      const logoutRes = await axiosJwt.post('/auth/logout', {
        refreshToken: user.refreshToken,
      });
      console.log(logoutRes);
      dispatch(logoutSuccess());
      dispatch(deleteAllCategories());
      dispatch(deleteAllTransactions());
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
    }, 5000);
  },

  updateInfo: async (data, user, dispatch) => {
    dispatch(updateInfoStart());
    const axiosJwt = createAxiosJwt(user, dispatch);
    try {
      const updatedUser = await axiosJwt.post('/auth/updateInfo', data);
      dispatch(updateInfoSuccess(updatedUser));
    } catch (error) {
      console.log(error);
      dispatch(updateInfoError(error?.response?.data));
    }
  },
};

export default authApi;
