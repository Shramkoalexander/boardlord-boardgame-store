import sortingActionTypes from "./sorting.types";
import { sortTypeValues } from "../../components/sorting/sorting.utils";

const initialState = {
  sortType: sortTypeValues.POPULAR,
  showSorting: true,
};

const sortingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case sortingActionTypes.SET_SORT_TYPE:
      return { ...state, sortType: payload };

    case sortingActionTypes.SET_SHOW_SORTING:
      return { ...state, showSorting: payload };

    default:
      return state;
  }
};

export default sortingReducer;
