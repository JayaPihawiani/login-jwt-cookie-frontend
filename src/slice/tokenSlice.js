import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: null,
  isError: false,
  isLoading: false,
  isSucces: null,
  message: "",
};

export const refreshToken = createAsyncThunk(
  "user/refreshToken",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:5000/api/token");
      return response.data;
    } catch (error) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(refreshToken.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.isSucces = true;
    });
    builder.addCase(refreshToken.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = tokenSlice.actions;
export default tokenSlice.reducer;
