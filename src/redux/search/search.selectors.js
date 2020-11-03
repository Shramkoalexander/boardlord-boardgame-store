import { createSelector } from "reselect";

export const selectSearch = (state) => state.search;

export const selectIsSearchFieldVisible = createSelector(
  [selectSearch],
  (search) => search.isSearchFieldVisible
);

export const selectIsSearchDropdownVisible = createSelector(
  [selectSearch],
  (search) => search.isSearchDropdownVisible
);

export const selectIsSearchModalVisible = createSelector(
  [selectSearch],
  (search) => search.isSearchModalVisible
);

export const selectCurrenListItemIndex = createSelector(
  [selectSearch],
  (search) => search.currenListItemIndex
);

export const selectSearchQuery = createSelector(
  [selectSearch],
  (search) => search.searchQuery
);
