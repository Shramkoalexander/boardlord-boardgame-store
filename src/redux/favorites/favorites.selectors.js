import { createSelector } from "reselect";

export const selectFavorites = (state) => state.favorites;

export const selectFavoriteItems = createSelector(
  [selectFavorites],
  (favorites) => favorites.favoriteItems
);

export const selectIsAnyFavorite = createSelector(
  [selectFavoriteItems],
  (favoriteItems) => !!favoriteItems.length
);

export const selectIsItemFavorite = (itemToFind) =>
  createSelector(
    [selectFavoriteItems],
    (favoriteItems) => !!favoriteItems.find((item) => item.id === itemToFind.id)
  );
