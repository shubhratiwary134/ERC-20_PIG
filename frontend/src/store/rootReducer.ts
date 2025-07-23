import { combineReducers } from "@reduxjs/toolkit";
import walletReducer from "./slices/wallet";
const rootReducer = combineReducers({
  wallet: walletReducer,
});
export default rootReducer;
