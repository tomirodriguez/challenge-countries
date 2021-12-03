import { createSlice } from "@reduxjs/toolkit";

export const selectedCountrySlice = createSlice({
  name: "selectedCountry",
  initialState: {
    country: null,
  },
  reducers: {
    reset: (state) => {
      state.country = null;
    },
    set: (state, action) => {
      if (state.country === action.payload) return;
      state.country = action.payload;
    },
  },
});

export const { reset, set } = selectedCountrySlice.actions;

export default selectedCountrySlice.reducer;
