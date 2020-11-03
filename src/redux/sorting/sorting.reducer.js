import sortingActionTypes from "./sorting.types";
import { sortTypeValues } from "../../components/sorting/sorting.utils";

const initialState = {
  sortType: sortTypeValues.POPULAR,
  itemsToSortCount: 0,
};

const sortingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case sortingActionTypes.SET_SORT_TYPE:
      return { ...state, sortType: payload };

    case sortingActionTypes.SET_ITEMS_TO_SORT_COUNT:
      return { ...state, itemsToSortCount: payload };

    default:
      return state;
  }
};

export default sortingReducer;
