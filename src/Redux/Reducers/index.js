"use client";

import { combineReducers } from "@reduxjs/toolkit";
import currentUserReducer from "../Authentication/AuthSlice";
import orderDataReducer from "../Order/OrderSlice";

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  orderData: orderDataReducer,
});

export default rootReducer;
