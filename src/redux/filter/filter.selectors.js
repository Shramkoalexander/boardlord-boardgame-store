import { createSelector } from "reselect";

export const selectFilter = (state) => state.filter;

export const selectGameTime = createSelector(
  [selectFilter],
  (filter) => filter.gameTime
);

export const selectPlayersCount = createSelector(
  [selectFilter],
  (filter) => filter.playersCount
);

export const selectIsInStock = createSelector(
  [selectFilter],
  (filter) => filter.isInStock
);

export const selectShowFilter = createSelector(
  [selectFilter],
  (filter) => filter.showFilter
);

export const selectPriceValues = createSelector(
  [selectFilter],
  (filter) => filter.priceValues
);

export const selectDebouncedPriceValues = createSelector(
  [selectFilter],
  (filter) => filter.debouncedPriceValues
);

export const selectItemsFound = createSelector(
  [selectFilter],
  (filter) => filter.itemsFound
);

export const selectPriceLimits = createSelector(
  [selectFilter],
  (filter) => filter.priceLimits
);

export const selectNeedResetPriceLimits = createSelector(
  [selectFilter],
  (filter) => filter.needResetPriceLimits
);
