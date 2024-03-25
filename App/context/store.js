import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./location";

const rootReducer = {
  location: locationReducer,
  // Add other reducers here if you have them
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
