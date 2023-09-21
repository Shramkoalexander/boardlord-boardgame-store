import {combineReducers} from "redux";
import filterReducer from "./filter/filter.reducer";
import paginationReducer from "./pagination/pagination.reducer";
import shopReducer from "./shop/shop.reducer";
import sortingReducer from "./sorting/sorting.reducer";
import searchReducer from "./search/search.reducer";
import cartReducer from "./cart/cart.reducer";
import sidebarMenuReducer from "./sidebar-menu/sidebar-menu.reducer";
import breakpointsProviderReducer from "./breakpoints-provider/breakpoints-provider.reducer";
import fixedHeaderWrapperReducer from "./fixed-header-wrapper/fixed-header-wrapper.reducer";
import favoritesReducer from "./favorites/favorites.reducer";
import userReducer from "./user/user.reducer";
import directoriesReducer from "./directories/directories.reducer";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {cartTransform, favoritesTransform} from "./redux-persist.utils";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "favorites"],
  transforms: [cartTransform, favoritesTransform],
};

const rootReducer = combineReducers({
  filter: filterReducer,
  pagination: paginationReducer,
  shop: shopReducer,
  sorting: sortingReducer,
  search: searchReducer,
  directories: directoriesReducer,
  cart: cartReducer,
  sidebarMenu: sidebarMenuReducer,
  breakpointsProvider: breakpointsProviderReducer,
  fixedHeaderWrapper: fixedHeaderWrapperReducer,
  favorites: favoritesReducer,
  user: userReducer,
});

export default persistReducer(persistConfig, rootReducer);
