import fixedHeaderWrapperActionTypes from "./fixed-header-wrapper.types";

const initialState = {
  isHeaderVisible: true,
};

const fixedHeaderWrapperReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case fixedHeaderWrapperActionTypes.SHOW_HEADER:
      return { ...state, isHeaderVisible: true };

    case fixedHeaderWrapperActionTypes.HIDE_HEADER:
      return { ...state, isHeaderVisible: false };

    default:
      return state;
  }
};

export default fixedHeaderWrapperReducer;
