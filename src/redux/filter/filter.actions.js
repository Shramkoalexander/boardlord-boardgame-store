import filterActionTypes from "./filter.types";

export const resetFilter = () => ({
  type: filterActionTypes.RESET_FILTER,
});

export const setGameTime = (gameTime) => ({
  type: filterActionTypes.SET_GAME_TIME,
  payload: gameTime,
});

export const setPlayersCount = (playersCount) => ({
  type: filterActionTypes.SET_PLAYERS_COUNT,
  payload: playersCount,
});

export const toggleIsInStock = () => ({
  type: filterActionTypes.TOGGLE_IS_IN_STOCK,
});

export const setPriceValues = (priceValues) => ({
  type: filterActionTypes.SET_PRICE_VALUES,
  payload: priceValues,
});

export const setDebouncedPriceValues = (debouncedPriceValues) => ({
  type: filterActionTypes.SET_DEBOUNCED_PRICE_VALUES,
  payload: debouncedPriceValues,
});

export const setShowFilter = (showFilter) => ({
  type: filterActionTypes.SET_SHOW_FILTER,
  payload: showFilter,
});

export const resetPriceLimits = (newPriceLimits) => ({
  type: filterActionTypes.RESET_PRICE_LIMITS,
  payload: newPriceLimits,
});

export const setItemsFound = (itemsFound) => ({
  type: filterActionTypes.SET_ITEMS_FOUND,
  payload: itemsFound,
});
