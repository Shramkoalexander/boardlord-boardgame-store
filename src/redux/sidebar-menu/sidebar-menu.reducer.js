import sidebarMenuActionTypes from "./sidebar-menu.types";

const initialState = {
  isSidebarMenuVisible: false,
};

const sidebarMenuReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case sidebarMenuActionTypes.TOGGLE_SHOW_SIDEBAR_MENU:
      return { ...state, isSidebarMenuVisible: !state.isSidebarMenuVisible };

    case sidebarMenuActionTypes.HIDE_SIDEBAR_MENU:
      return { ...state, isSidebarMenuVisible: false };

    default:
      return state;
  }
};

export default sidebarMenuReducer;
