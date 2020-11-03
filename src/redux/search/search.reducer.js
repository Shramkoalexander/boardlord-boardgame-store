import searchActionTypes from "./search.types";

const initialState = {
  currenListItemIndex: -1,
  searchQuery: "",
  isSearchDropdownVisible: false,
  isSearchFieldVisible: true,
  isSearchModalVisible: false,
};

const searchReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case searchActionTypes.HIDE_SEARCH_FIELD:
      return { ...state, isSearchFieldVisible: false };

    case searchActionTypes.HIDE_SEARCH_DROPDOWN:
      return {
        ...state,
        isSearchDropdownVisible: false,
        currenListItemIndex: initialState.currenListItemIndex,
      };

    case searchActionTypes.SHOW_SEARCH_DROPDOWN:
      return { ...state, isSearchDropdownVisible: true };

    case searchActionTypes.HIDE_SEARCH_MODAL:
      return {
        ...state,
        isSearchModalVisible: false,
      };

    case searchActionTypes.SHOW_SEARCH_MODAL:
      return { ...state, isSearchModalVisible: true };

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

    case searchActionTypes.RESET_CURRENT_LIST_ITEM_INDEX:
      return {
        ...state,
        currenListItemIndex: initialState.currenListItemIndex,
      };

    case searchActionTypes.SET_SEARCH_INPUT:
      return {
        ...state,
        searchQuery: payload,
        currenListItemIndex: initialState.currenListItemIndex,
      };

    default:
      return state;
  }
};

export default searchReducer;
