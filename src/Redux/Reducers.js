"use client";

import { combineReducers } from "@reduxjs/toolkit";
import currentUserReducer from "./Authentication/AuthSlice";
import orderDataReducer from "./Order/OrderSlice";
import productDataReducer from "./Product/ProductSlice";
import analyticDataReducer from "./Analytics/analytic.slice";
import pagesDataReducer from "./PagesData/PagesDataSlice";
import { categoryReducer } from "./Category/CategorySlice";
import { siteNameReducer } from "./SiteName/SiteNameSlice";
import cartDataReducer from "./CartData/cartDataSlice";
import { networkReducer } from "./Network/networkSlice";
import { sectionsDataReducer } from "./SectionsData/SectionsDataSlice";
import { livePreviewReducer } from "./LivePreview/livePreviewSlice";
import storeDetailReducer from "./StoreDetail/StoreDetail.slice";

const rootReducer = combineReducers({
  orderData: orderDataReducer,
  currentUser: currentUserReducer,
  pagesData: pagesDataReducer,
  sectionsData: sectionsDataReducer,
  siteName: siteNameReducer,
  analytics: analyticDataReducer,
  network: networkReducer,
  productData: productDataReducer,
  cartData: cartDataReducer,
  categories: categoryReducer,
  livePreview: livePreviewReducer,
  storeDetail: storeDetailReducer,
});

export default rootReducer;
