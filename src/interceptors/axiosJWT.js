import axios from "axios";
import { refreshToken } from "../slice/tokenSlice";
import { jwtDecode } from "jwt-decode";

const axiosJWT = axios.create();

export const setupAxiosIntercept = (store) => {
  axiosJWT.interceptors.request.use(
    async (config) => {
      const state = store.getState();
      const token = state.tokenData.data.accessToken;
      if (token) {
        const decoded = jwtDecode(token);
        const exp = decoded.exp;
        const currDate = new Date();
        if (exp * 1000 < currDate.getTime()) {
          const response = await store.dispatch(refreshToken());
          const newToken = response.payload.accessToken;
          config.headers.Authorization = `Bearer ${newToken}`;
        }
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
};

export default axiosJWT;
