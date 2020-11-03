import sortingActionTypes from "./sorting.types";

export const setSortType = (sortType) => ({
  type: sortingActionTypes.SET_SORT_TYPE,
  payload: sortType,
});

export const setItemsToSortCount = (itemsToSortCount) => ({
  type: sortingActionTypes.SET_ITEMS_TO_SORT_COUNT,
  payload: itemsToSortCount,
});
