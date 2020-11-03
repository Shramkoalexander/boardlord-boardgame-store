import sidebarMenuActionTypes from "./sidebar-menu.types";

export const toggleShowSidebarMenu = () => ({
  type: sidebarMenuActionTypes.TOGGLE_SHOW_SIDEBAR_MENU,
});

export const hideSidebarMenu = () => ({
  type: sidebarMenuActionTypes.HIDE_SIDEBAR_MENU,
});
