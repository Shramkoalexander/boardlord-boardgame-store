import shopActionTypes from "./shop.types";
import { currencyTypes } from "./shop.utils";

const initialState = {
  currency: currencyTypes.RUB,
  collection: [],
  error: null,
};

const shopReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case shopActionTypes.FETCH_COLLECTION_START:
      return { ...state, error: null };

    case shopActionTypes.FETCH_COLLECTION_SUCCESS:
      return { ...state, collection: payload };

    case shopActionTypes.FETCH_COLLECTION_FAILURE:
      return { ...state, error: payload };

    default:
      return state;
  }
};

export default shopReducer;
