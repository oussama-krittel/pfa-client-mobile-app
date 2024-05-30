import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./location";
import basketReducer from "./basket";
import restaurantsReducer from "./restaurants"

const rootReducer = {
  location: locationReducer,
  basket: basketReducer,
  restaurants: restaurantsReducer
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
