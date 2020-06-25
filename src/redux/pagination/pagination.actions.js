import paginationActionTypes from "./pagination.types";

export const setCurrentPage = (page) => ({
  type: paginationActionTypes.SET_CURRENT_PAGE,
  payload: page,
});

export const setPaginatedCollection = (paginatedCollection) => ({
  type: paginationActionTypes.SET_PAGINATED_COLLECTION,
  payload: paginatedCollection,
});

export const setItemsCount = (itemsCount) => ({
  type: paginationActionTypes.SET_ITEMS_COUNT,
  payload: itemsCount,
});
