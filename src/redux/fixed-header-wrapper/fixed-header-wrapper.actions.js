import fixedHeaderWrapperActionTypes from "./fixed-header-wrapper.types";

export const showHeader = () => ({
  type: fixedHeaderWrapperActionTypes.SHOW_HEADER,
});

export const hideHeader = () => ({
  type: fixedHeaderWrapperActionTypes.HIDE_HEADER,
});
