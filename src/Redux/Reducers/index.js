"use client";

import { combineReducers } from 'redux';
import currentUserReducer from '../Authentication/AuthSlice';

const rootReducer = combineReducers({
    currentUser:currentUserReducer,
});

export default rootReducer;
