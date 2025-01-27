"use client";

import { combineReducers } from "@reduxjs/toolkit";
import currentUserReducer from "../Authentication/AuthSlice";
import orderDataReducer from "../Order/OrderSlice";
import productDataReducer from "../Product/ProductSlice";
import analyticDataReducer from "../Analytics/analytic.slice";
import pagesDataReducer from "../PagesData/PagesDataSlice";
import { categoryReducer } from "../Category/CategorySlice";
import { siteNameReducer } from "../SiteName/SiteNameSlice";
import { networkReducer } from "../Network/networkSlice";

const rootReducer = combineReducers({
  orderData: orderDataReducer,
  currentUser: currentUserReducer,
  pagesData: pagesDataReducer,
  siteName: siteNameReducer,
  analytics: analyticDataReducer,
  network: networkReducer,
  productData: productDataReducer,
  categories: categoryReducer,
});

export default rootReducer;
