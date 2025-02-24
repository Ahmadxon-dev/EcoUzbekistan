import userReducer from './userSlice';
import {combineReducers} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    user: userReducer,
    // Add more reducers here
});

export default rootReducer;