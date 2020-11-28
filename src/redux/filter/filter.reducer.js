import filterActionTypes from "./filter.types";
import { filterValues } from "../../components/filter/filter.utils";

const initialState = {
  debouncedPriceValues: [0, 0],
  priceValues: [0, 0],
  priceLimits: [0, 0],
  gameTime: filterValues.gameTime.UNSET,
  playersCount: filterValues.playersCount.ALL,
  isInStock: true,
  showFilter: true,
  needResetPriceLimits: true,
  itemsFound: 0,
};

const filterReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case filterActionTypes.RESET_FILTER:
      return initialState;

    case filterActionTypes.SET_DEBOUNCED_PRICE_VALUES:
      return { ...state, debouncedPriceValues: payload };

    case filterActionTypes.SET_PRICE_VALUES:
      return { ...state, priceValues: payload };

    case filterActionTypes.RESET_PRICE_LIMITS:
      return {
        ...state,
        needResetPriceLimits: false,
        debouncedPriceValues: payload,
        priceValues: payload,
        priceLimits: payload,
      };

    case filterActionTypes.SET_GAME_TIME:
      return { ...state, gameTime: payload, needResetPriceLimits: true };

    case filterActionTypes.SET_SHOW_FILTER:
      return { ...state, showFilter: payload };

    case filterActionTypes.TOGGLE_IS_IN_STOCK:
      return {
        ...state,
        isInStock: !state.isInStock,
        needResetPriceLimits: true,
      };

    case filterActionTypes.SET_PLAYERS_COUNT:
      return { ...state, playersCount: payload, needResetPriceLimits: true };

    case filterActionTypes.SET_ITEMS_FOUND:
      return { ...state, itemsFound: payload };

    default:
      return state;
  }
};

export default filterReducer;
