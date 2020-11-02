import breakpointsActionTypes from "./breakpoints-provider.types";

export const setBreakpoints = (breakpoints) => ({
  type: breakpointsActionTypes.SET_BREAKPOINTS,
  payload: breakpoints,
});

export const setCurrentViewportAlias = (breakpoint) => ({
  type: breakpointsActionTypes.SET_CURRENT_BREAKPOINT,
  payload: breakpoint,
});
