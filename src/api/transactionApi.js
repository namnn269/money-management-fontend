import queryString from 'query-string';

const {
  postTransStart,
  postTransSuccess,
  postTransError,
  getTransStart,
  getTransSuccess,
  getTransError,
  deleteTransStart,
  deleteTransSuccess,
  deleteTransError,
  updateTransStart,
  updateTransError,
  updateTransSuccess,
} = require('~/redux/transactionSlice');
const { default: createAxiosJwt } = require('./axiosClient');

const transactionApi = {
  post: async (data, user, dispatch) => {
    dispatch(postTransStart());
    const transAxios = createAxiosJwt(user, dispatch);
    try {
      const trans = await transAxios.post('/transactions', data);
      dispatch(postTransSuccess(trans));
    } catch (error) {
      console.log(error);
      dispatch(postTransError());
    }
  },

  update: async (data, user, dispatch) => {
    dispatch(updateTransStart());
    const transAxios = createAxiosJwt(user, dispatch);
    try {
      const trans = await transAxios.post('/transactions', data);
      dispatch(updateTransSuccess(trans));
    } catch (error) {
      console.log(error);
      dispatch(updateTransError());
    }
  },

  get: async (data, user, dispatch) => {
    dispatch(getTransStart());
    const transAxios = createAxiosJwt(user, dispatch);
    try {
      const res = await transAxios.get('/transactions', {
        params: data,
        paramsSerializer: {
          serialize: (params) => queryString.stringify(params),
        },
      });
      dispatch(getTransSuccess(res));
      return res;
    } catch (error) {
      console.log(error);
      dispatch(getTransError());
    }
  },

  getTotalAmount: async (user, dispatch) => {
    try {
      const transAxios = createAxiosJwt(user, dispatch);
      const res = await transAxios.get('/transactions/total');
      return res;
    } catch (error) {
      console.log(error);
    }
  },

  getRecentTrans: async (quantity, user, dispatch) => {
    try {
      const transAxios = createAxiosJwt(user, dispatch);
      const res = await transAxios.get('/transactions/recent', {
        params: { quantity },
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  },

  delete: async (id, user, dispatch) => {
    dispatch(deleteTransStart());
    const transAxios = createAxiosJwt(user, dispatch);
    try {
      await transAxios.delete(`/transactions/${id}`);
      dispatch(deleteTransSuccess({ id }));
    } catch (error) {
      console.log(error);
      dispatch(deleteTransError(error));
    }
  },
};

export default transactionApi;
