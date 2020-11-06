import favoritesActionTypes from "./favorites.types";

export const toggleFavorite = (item) => ({
  type: favoritesActionTypes.TOGGLE_FAVORITE,
  payload: item,
});

export const clearFavorites = () => ({
  type: favoritesActionTypes.CLEAR_FAVORITES,
});

export const fetchUserFavoriteItemsSuccess = (favoriteItems) => ({
  type: favoritesActionTypes.FETCH_USER_FAVORITE_ITEMS_SUCCESS,
  payload: favoriteItems,
});

export const fetchUserFavoriteItemsFailure = (error) => ({
  type: favoritesActionTypes.FETCH_USER_FAVORITE_ITEMS_FAILURE,
  payload: error,
});

export const updateUserFavoriteItemsSuccess = () => ({
  type: favoritesActionTypes.UPDATE_USER_FAVORITE_ITEMS_SUCCESS,
});

export const updateUserFavoriteItemsFailure = (error) => ({
  type: favoritesActionTypes.UPDATE_USER_FAVORITE_ITEMS_FAILURE,
  payload: error,
});
