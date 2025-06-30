"use cleint";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./Reducers";

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production", // ✅ secure
});

export const dispatch = store.dispatch;
