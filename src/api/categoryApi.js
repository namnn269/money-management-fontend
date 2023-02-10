import { deleteTransSuccess } from '~/redux/transactionSlice';

const {
  postCategorySuccess,
  postCategoryError,
  postCategoryStart,
  getAllCategoryStart,
  getAllCategorySuccess,
  getAllCategoryError,
  deleteCategoryStart,
  deleteCategoryError,
  deleteCategorySuccess,
  updateCategoryStart,
  updateCategorySuccess,
  updateCategoryError,
} = require('~/redux/categorySlice');
const { default: createAxiosJwt } = require('./axiosClient');

const categoryApi = {
  postCategory: async (data, user, dispatch) => {
    if (!user) return;
    const axiosCategory = createAxiosJwt(user, dispatch);
    dispatch(postCategoryStart());
    try {
      console.log(data);
      const res = await axiosCategory.post('/categories', data);
      console.log(res);
      dispatch(postCategorySuccess(res));
    } catch (error) {
      console.log(error);
      dispatch(postCategoryError(error.response.data));
    }
  },

  updateCategory: async (data, user, dispatch) => {
    if (!user) return;
    dispatch(updateCategoryStart());
    try {
      const axiosCategory = createAxiosJwt(user, dispatch);
      const res = await axiosCategory.post('/categories', data);
      dispatch(updateCategorySuccess(res));
    } catch (error) {
      console.log(error);
      dispatch(updateCategoryError(error.response.data));
    }
  },

  getAllCategroies: async (user, dispatch) => {
    if (!user) return;
    dispatch(getAllCategoryStart());
    try {
      const axiosCategory = createAxiosJwt(user, dispatch);
      const res = await axiosCategory.get('/categories');
      dispatch(getAllCategorySuccess(res));
    } catch (error) {
      dispatch(getAllCategoryError());
      console.log(error);
    }
  },

  deleteCategory: async (id, user, dispatch) => {
    if (!user) return;
    dispatch(deleteCategoryStart());
    try {
      const axiosCategory = createAxiosJwt(user, dispatch);
      const res = await axiosCategory.delete(`/categories/${id}`);
      dispatch(deleteCategorySuccess({ res, id }));
      dispatch(deleteTransSuccess({ categoryId: id }));
    } catch (error) {
      console.log(error);
      dispatch(deleteCategoryError(error.response.data));
    }
  },
};

export default categoryApi;
