import { combineReducers } from "redux";
import filterReducer from "./filter/filter.reducer";
import shopReducer from "./shop/shop.reducer";
import sortingReducer from "./sorting/sorting.reducer";
export default combineReducers({
  filter: filterReducer,
  shop: shopReducer,
  sorting: sortingReducer,
});
