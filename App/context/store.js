import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./location";
import basketReducer from "./basket";

const rootReducer = {
  location: locationReducer,
  basket: basketReducer,
  // Add other reducers here
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
