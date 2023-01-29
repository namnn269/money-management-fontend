import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { loginSuccess } from '~/redux/authSlice';

const getRefreshToken = async (user) => {
  try {
    const response = await axios.post(
      '/auth/refresh-token',
      {
        refreshToken: user.refreshToken,
      },
      { baseURL: process.env.REACT_APP_API_URL }
    );
    return response.data;
  } catch (error) {
    console.log('refresh token error: ', error);
  }
};

//////////////////////////////////////////////////////////
const createAxiosJwt = (user, dispatch) => {
  const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${user?.accessToken}`,
    },
  });

  axiosClient.interceptors.request.use(async (config) => {
    const now = new Date().getTime() / 1000;
    const expiration = jwtDecode(user?.accessToken).exp;
    if (now > expiration) {
      const newTokens = await getRefreshToken(user);
      config.headers['Authorization'] = `Bearer ${newTokens.accessToken}`;
      config.data = { refreshToken: newTokens.refreshToken };
      dispatch?.(
        loginSuccess({
          ...user,
          accessToken: newTokens.accessToken,
          refreshToken: newTokens.refreshToken,
        })
      );
    }

    return config;
  });

  axiosClient.interceptors.response.use(
    (response) => {
      // console.log(response);
      return response.data;
    },
    (error) => {
      console.log(error);
      throw error;
    }
  );
  return axiosClient;
};
export default createAxiosJwt;
