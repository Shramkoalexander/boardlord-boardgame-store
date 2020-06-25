import searchActionTypes from "./search.types";

export const hideSearchField = () => ({
  type: searchActionTypes.HIDE_SEARCH_FIELD,
});

export const toggleSearchFieldVisibility = () => ({
  type: searchActionTypes.TOGGLE_SEARCH_FIELD_VISIBILITY,
});

export const setCurrentListItemIndex = (listItemIndex) => ({
  type: searchActionTypes.SET_CURRENT_LIST_ITEM_INDEX,
  payload: listItemIndex,
});

export const increaseCurrentListItemIndex = () => ({
  type: searchActionTypes.INCREASE_CURRENT_LIST_ITEM_INDEX,
});

export const decreaseCurrentListItemIndex = () => ({
  type: searchActionTypes.DECREASE_CURRENT_LIST_ITEM_INDEX,
});

export const setSearchInput = (searchInput) => ({
  type: searchActionTypes.SET_SEARCH_INPUT,
  payload: searchInput,
});
