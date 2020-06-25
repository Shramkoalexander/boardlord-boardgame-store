import { createSelector } from "reselect";

export const selectSearch = (state) => state.search;

export const selectIsSearchFieldVisible = createSelector(
  [selectSearch],
  (search) => search.isSearchFieldVisible
);

export const selectCurrenListItemIndex = createSelector(
  [selectSearch],
  (search) => search.currenListItemIndex
);

export const selectSearchInput = createSelector(
  [selectSearch],
  (search) => search.searchInput
);
