import searchActionTypes from "./search.types";

const initialState = {
  currenListItemIndex: -1,
  searchInput: "",
  isSearchFieldVisible: false,
};

const searchReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case searchActionTypes.HIDE_SEARCH_FIELD:
      return { ...state, isSearchFieldVisible: false };

    case searchActionTypes.TOGGLE_SEARCH_FIELD_VISIBILITY:
      return { ...state, isSearchFieldVisible: !state.isSearchFieldVisible };

    case searchActionTypes.SET_CURRENT_LIST_ITEM_INDEX:
      return { ...state, currenListItemIndex: payload };

    case searchActionTypes.INCREASE_CURRENT_LIST_ITEM_INDEX:
      return {
        ...state,
        currenListItemIndex: state.currenListItemIndex + 1,
      };

    case searchActionTypes.DECREASE_CURRENT_LIST_ITEM_INDEX:
      return {
        ...state,
        currenListItemIndex: state.currenListItemIndex - 1,
      };

    case searchActionTypes.SET_SEARCH_INPUT:
      return {
        ...state,
        searchInput: payload,
        currenListItemIndex: initialState.currenListItemIndex,
      };

    default:
      return state;
  }
};

export default searchReducer;
