import paginationActionTypes from "./pagination.types";

const initialState = {
  itemsPerPage: 12,
  currentPage: 1,
  visiblePagesCount: 5,
  paginatedCollection: [],
  itemsCount: 0,
};

const paginationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case paginationActionTypes.SET_CURRENT_PAGE:
      return { ...state, currentPage: payload };

    case paginationActionTypes.SET_PAGINATED_COLLECTION:
      return { ...state, paginatedCollection: payload };

    case paginationActionTypes.SET_ITEMS_COUNT:
      return {
        ...state,
        itemsCount: payload,
        currentPage: initialState.currentPage,
      };

    default:
      return state;
  }
};

export default paginationReducer;
