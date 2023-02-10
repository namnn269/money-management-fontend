import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { loginSuccess } from '~/redux/authSlice';

let canFetch = true;
let waitNewTokens = {};
const delay = async (ms) => new Promise((res) => setTimeout(res, ms));
const waitForGetRefreshToken = async () => {
  if (!canFetch) {
    await delay(100);
    await waitForGetRefreshToken();
  } else return;
};

const getRefreshToken = async (user) => {
  try {
    const response = await axios.post(
      '/auth/refresh-token',
      { refreshToken: user.refreshToken },
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

  axiosClient.interceptors.request.use(
    async (config) => {
      if (!canFetch) {
        await waitForGetRefreshToken();
        config.headers['Authorization'] = `Bearer ${waitNewTokens.accessToken}`;
        config.data = { refreshToken: waitNewTokens.refreshToken };
      } else {
        const now = new Date().getTime() / 1000;
        const expiration = jwtDecode(user?.accessToken).exp;
        if (now > expiration) {
          canFetch = false;
          const newTokens = (await getRefreshToken(user)) || waitNewTokens;
          waitNewTokens = newTokens;
          config.headers['Authorization'] = `Bearer ${newTokens.accessToken}`;
          dispatch(
            loginSuccess({
              ...user,
              accessToken: newTokens.accessToken,
              refreshToken: newTokens.refreshToken,
            })
          );
          canFetch = true;
        }
      }
      return config;
    },
    (error) => {
      console.log(error);
    }
  );

  axiosClient.interceptors.response.use(
    (response) => {
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
