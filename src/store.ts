import { configureStore } from "@reduxjs/toolkit";
import loadingDataReducer from "./reducers/loadingDataReducer";
import selectedCountryReducer from "./reducers/selectedCountryReducer";

const store = configureStore({
  reducer: {
    selectedCountry: selectedCountryReducer,
    loadingData: loadingDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
