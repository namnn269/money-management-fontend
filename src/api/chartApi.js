import createAxiosJwt from '~/api/axiosClient';

const chartApi = {
  comparisonChart: async (data, user, dispatch) => {
    try {
      const axiosClient = user && createAxiosJwt(user, dispatch);
      const res = await axiosClient.get('/chart-comparison', {
        params: data,
      });
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  pieChart: async (data, user, dispatch) => {
    try {
      const chartAxios = user && createAxiosJwt(user, dispatch);
      const res = await chartAxios.get('/chart-pie', {
        params: data,
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  },
};

export default chartApi;
