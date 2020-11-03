import searchActionTypes from "./search.types";

export const hideSearchDropdown = () => ({
  type: searchActionTypes.HIDE_SEARCH_DROPDOWN,
});

export const showSearchDropdown = () => ({
  type: searchActionTypes.SHOW_SEARCH_DROPDOWN,
});

export const hideSearchModal = () => ({
  type: searchActionTypes.HIDE_SEARCH_MODAL,
});

export const showSearchModal = () => ({
  type: searchActionTypes.SHOW_SEARCH_MODAL,
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

export const resetCurrentListItemIndex = () => ({
  type: searchActionTypes.RESET_CURRENT_LIST_ITEM_INDEX,
});

export const setSearchQuery = (searchQuery) => ({
  type: searchActionTypes.SET_SEARCH_INPUT,
  payload: searchQuery,
});
