"use client";

import { combineReducers } from "@reduxjs/toolkit";
import currentUserReducer from "../Authentication/AuthSlice";
import orderDataReducer from "../Order/OrderSlice";
import  productDataReducer from "../Product/ProductSlice";
import analyticDataReducer from "../Analytics/analytic.slice";
import pagesDataReducer from "../PagesData/PagesDataSlice";

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  orderData: orderDataReducer,
  productData: productDataReducer,
  analytics:analyticDataReducer,
  pagesData: pagesDataReducer,
});

export default rootReducer;
