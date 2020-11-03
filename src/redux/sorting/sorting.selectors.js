import { createSelector } from "reselect";

export const selectSorting = (state) => state.sorting;

export const selectSortType = createSelector(
  [selectSorting],
  (sorting) => sorting.sortType
);

export const selectItemsToSortCount = createSelector(
  [selectSorting],
  (sorting) => sorting.itemsToSortCount
);
