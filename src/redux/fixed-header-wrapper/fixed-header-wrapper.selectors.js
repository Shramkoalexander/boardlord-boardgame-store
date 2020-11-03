import { createSelector } from "reselect";

export const selectFixedHeaderWrapper = (state) => state.fixedHeaderWrapper;

export const selectIsHeaderVisible = createSelector(
  [selectFixedHeaderWrapper],
  (fixedHeader) => fixedHeader.isHeaderVisible
);
