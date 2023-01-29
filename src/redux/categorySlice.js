import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    list: [],
    post: { message: '', isFetching: false, error: false, success: false },
    update: { message: '', isFetching: false, error: false, success: false },
    getAll: { message: '', isFetching: false, error: false, success: false },
    delete: { message: '', isFetching: false, error: false, success: false },
  },
  reducers: {
    postCategoryStart: (state) => {
      state.post.isFetching = true;
      state.post.success = false;
      state.post.error = false;
    },
    postCategorySuccess: (state, actions) => {
      state.post.isFetching = false;
      state.post.success = true;
      state.post.error = false;
      state.list.push(actions.payload);
      state.post.message = 'Add new category successfully!!!';
    },
    postCategoryError: (state, actions) => {
      state.post.isFetching = false;
      state.post.success = false;
      state.post.error = true;
      state.post.message = actions.payload.message;
    },

    updateCategoryStart: (state) => {
      state.update.isFetching = true;
      state.update.success = false;
      state.update.error = false;
    },
    updateCategorySuccess: (state, actions) => {
      state.update.isFetching = false;
      state.update.success = true;
      state.update.error = false;
      state.update.message = 'Update successfully!';
      const index = state.list.findIndex(
        (category) => category.id === actions.payload.id
      );
      state.list.splice(index, 1, actions.payload);
    },
    updateCategoryError: (state, actions) => {
      state.update.isFetching = false;
      state.update.success = false;
      state.update.error = false;
      state.update.message = 'Update failed!';
    },

    getAllCategoryStart: (state) => {
      state.getAll.isFetching = true;
      state.getAll.success = false;
      state.getAll.error = false;
    },
    getAllCategorySuccess: (state, actions) => {
      state.getAll.isFetching = false;
      state.getAll.success = true;
      state.getAll.error = false;
      state.list = actions.payload;
    },
    getAllCategoryError: (state, actions) => {
      state.getAll.isFetching = false;
      state.getAll.success = false;
      state.getAll.error = true;
      state.getAll.message = actions.payload;
    },

    deleteCategoryStart: (state) => {
      state.delete.isFetching = true;
      state.delete.success = false;
      state.delete.error = false;
    },
    deleteCategorySuccess: (state, actions) => {
      state.delete.isFetching = false;
      state.delete.success = true;
      state.delete.error = false;
      state.delete.message = actions.payload.res.message;
      state.list = state.list.filter(
        (category) => category.id !== actions.payload.id
      );
    },
    deleteCategoryError: (state, actions) => {
      state.delete.isFetching = false;
      state.delete.success = false;
      state.delete.error = true;
      state.delete.message = actions.payload.message;
    },
    deleteAllCategories: (state) => {
      state.isFetching = false;
      state.delete.success = false;
      state.error = false;
      state.message = '';
      state.list = [];
    },
  },
});

export const {
  postCategoryStart,
  postCategorySuccess,
  postCategoryError,
  updateCategoryStart,
  updateCategorySuccess,
  updateCategoryError,
  getAllCategoryStart,
  getAllCategorySuccess,
  getAllCategoryError,
  deleteCategoryStart,
  deleteCategorySuccess,
  deleteCategoryError,
  deleteAllCategories,
} = categorySlice.actions;

export default categorySlice.reducer;
