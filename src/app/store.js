import { configureStore } from "@reduxjs/toolkit";
import tokenSlice from "../slice/tokenSlice";
import { setupAxiosIntercept } from "../interceptors/axiosJWT";

export const store = configureStore({
  reducer: {
    tokenData: tokenSlice,
  },
});

setupAxiosIntercept(store);
