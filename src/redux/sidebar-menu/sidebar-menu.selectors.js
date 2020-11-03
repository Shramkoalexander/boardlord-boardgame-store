import { createSelector } from "reselect";

export const selectSidebarMenu = (state) => state.sidebarMenu;

export const selectIsSidebarMenuVisible = createSelector(
  [selectSidebarMenu],
  (sidebarMenu) => sidebarMenu.isSidebarMenuVisible
);
