import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slice/authSlice";
import cartReducer from "./slice/cartSlice";
import api from "../middleware/api";
import loggerMiddleware from "../middleware/logMiddleware";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api, loggerMiddleware),
});

export default store;