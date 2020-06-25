import { combineReducers } from "redux";
import filterReducer from "./filter/filter.reducer";
import shopReducer from "./shop/shop.reducer";
export default combineReducers({
  filter: filterReducer,
  shop: shopReducer,
});
