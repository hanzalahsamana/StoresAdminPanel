'use client';

import { combineReducers } from '@reduxjs/toolkit';
import currentUserReducer from './Authentication/AuthSlice';
import orderDataReducer from './Order/OrderSlice';
import productDataReducer from './Product/ProductSlice';
import analyticDataReducer from './Analytics/analytic.slice';
import cartDataReducer from './CartData/cartDataSlice';
import allStoresReducer from './AllStores/StoreDetail.slice';
import storeReducer from './Store/StoreDetail.slice';
import storeConfgurationReducer from './StoreConfiguration/StoreConfigurationSlice';
import { contentDataReducer } from './ContentData/ContentDataSlice';
import { sectionsDataReducer } from './SectionsData/SectionsDataSlice';
import { livePreviewReducer } from './LivePreview/livePreviewSlice';
import { collectionReducer } from './Collection/CollectionSlice';
import { siteNameReducer } from './SiteName/SiteNameSlice';
import { networkReducer } from './Network/networkSlice';

const rootReducer = combineReducers({
  orderData: orderDataReducer,
  currentUser: currentUserReducer,
  contentData: contentDataReducer,
  sectionsData: sectionsDataReducer,
  siteName: siteNameReducer,
  analytics: analyticDataReducer,
  network: networkReducer,
  productData: productDataReducer,
  cartData: cartDataReducer,
  collection: collectionReducer,
  livePreview: livePreviewReducer,
  allStores: allStoresReducer,
  store: storeReducer,
  storeConfiguration: storeConfgurationReducer,
});

export default rootReducer;
