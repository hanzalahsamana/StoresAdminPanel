"use client";

import { combineReducers } from "@reduxjs/toolkit";
import currentUserReducer from "../Authentication/AuthSlice";
import orderDataReducer from "../Order/OrderSlice";
import  productDataReducer from "../Product/ProductSlice";
import analyticDataReducer from "../Analytics/analytic.slice";

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  orderData: orderDataReducer,
  productData: productDataReducer,
  analytics:analyticDataReducer,
});

export default rootReducer;
