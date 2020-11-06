import favoritesActionTypes from "./favorites.types";
import { toggleItem } from "./favorites.utils";

const initialState = {
  favoriteItems: [],
  error: null,
};

const favoritesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case favoritesActionTypes.TOGGLE_FAVORITE:
      return {
        ...state,
        favoriteItems: toggleItem(state.favoriteItems, payload),
      };

    case favoritesActionTypes.CLEAR_FAVORITES:
      return { ...state, favoriteItems: [] };

    case favoritesActionTypes.FETCH_USER_FAVORITE_ITEMS_SUCCESS:
      return { ...state, favoriteItems: payload, error: null };

    case favoritesActionTypes.UPDATE_USER_FAVORITE_ITEMS_SUCCESS:
      return { ...state, error: null };

    case favoritesActionTypes.FETCH_USER_FAVORITE_ITEMS_FAILURE:
    case favoritesActionTypes.UPDATE_USER_FAVORITE_ITEMS_FAILURE:
      return { ...state, error: payload };

    default:
      return state;
  }
};

export default favoritesReducer;
