import sortingActionTypes from "./sorting.types";

export const setSortType = (sortType) => ({
  type: sortingActionTypes.SET_SORT_TYPE,
  payload: sortType,
});

export const setShowSorting = (showSorting) => ({
  type: sortingActionTypes.SET_SHOW_SORTING,
  payload: showSorting,
});
