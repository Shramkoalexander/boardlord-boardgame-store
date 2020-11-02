import breakpointsActionTypes from "./breakpoints-provider.types";

const initialState = {
  breakpoints: {},
  currentViewportAlias: "",
};

const breakpointsProviderReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case breakpointsActionTypes.SET_BREAKPOINTS:
      return { ...state, breakpoints: payload };

    case breakpointsActionTypes.SET_CURRENT_BREAKPOINT:
      return { ...state, currentViewportAlias: payload };

    default:
      return state;
  }
};

export default breakpointsProviderReducer;
