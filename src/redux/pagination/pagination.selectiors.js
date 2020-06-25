import { createSelector } from "reselect";

export const selectPagination = (state) => state.pagination;

export const selectCurrentPage = createSelector(
  [selectPagination],
  (pagination) => pagination.currentPage
);

export const selectItemsPerPage = createSelector(
  [selectPagination],
  (pagination) => pagination.itemsPerPage
);

export const selectVisiblePageCount = createSelector(
  [selectPagination],
  (pagination) => pagination.visiblePagesCount
);

export const selectPaginatedCollection = createSelector(
  [selectPagination],
  (pagination) => pagination.paginatedCollection
);

export const selectItemsCount = createSelector(
  [selectPagination],
  (pagination) => pagination.itemsCount
);
