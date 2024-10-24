"use client";

import { combineReducers } from "@reduxjs/toolkit";
import currentUserReducer from "../Authentication/AuthSlice";

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
});

export default rootReducer;
