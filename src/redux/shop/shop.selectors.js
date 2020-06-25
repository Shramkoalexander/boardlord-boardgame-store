import { createSelector } from "reselect";

export const selectShop = (state) => state.shop;

export const selectCollection = createSelector(
  [selectShop],
  (shop) => shop.collection
);

export const selectCurrency = createSelector(
  [selectShop],
  (shop) => shop.currency
);
