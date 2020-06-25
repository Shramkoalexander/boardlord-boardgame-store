import { combineReducers } from "redux";
import filterReducer from "./filter/filter.reducer";
import paginationReducer from "./pagination/pagination.reducer";
import shopReducer from "./shop/shop.reducer";
import sortingReducer from "./sorting/sorting.reducer";
export default combineReducers({
  filter: filterReducer,
  pagination: paginationReducer,
  shop: shopReducer,
  sorting: sortingReducer,
});
