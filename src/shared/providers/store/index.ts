import { configureStore } from "@reduxjs/toolkit";
import shoppingReducer from "../../../entities/model/slice";

const isDevelopment = import.meta.env.MODE !== "production";

export const store = configureStore({
  reducer: {
    shopping: shoppingReducer,
  },
  devTools: isDevelopment,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
