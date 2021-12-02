import { createSlice } from "@reduxjs/toolkit";

export const loadingDataSlice = createSlice({
  name: "loading",
  initialState: {
    isLoading: true,
  },
  reducers: {
    willLoad: (state) => {
      state.isLoading = true;
    },
    loadFinished: (state) => {
      state.isLoading = false;
    },
  },
});

export const { willLoad, loadFinished } = loadingDataSlice.actions;

export default loadingDataSlice.reducer;
