import { createSelector } from "reselect";

export const selectBreakpointsProvider = (state) => state.breakpointsProvider;

export const selectCurrentViewportAlias = createSelector(
  [selectBreakpointsProvider],
  (breakpointsProvider) => breakpointsProvider.currentViewportAlias
);
export const selectBreakpoints = createSelector(
  [selectBreakpointsProvider],
  (breakpointsProvider) => breakpointsProvider.breakpoints
);
