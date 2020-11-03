import cartActionTypes from "./cart.types";
import { addItem, removeItem, clearItem } from "./cart.utils";

const initialState = {
  cartItems: [],
  isDropdownVisible: false,
  error: null,
};

const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case cartActionTypes.ADD_ITEM_TO_CART:
      return { ...state, cartItems: addItem(state.cartItems, payload) };

    case cartActionTypes.REMOVE_ITEM_FROM_CART:
      return { ...state, cartItems: removeItem(state.cartItems, payload) };

    case cartActionTypes.CLEAR_ITEM_FROM_CART:
      return { ...state, cartItems: clearItem(state.cartItems, payload) };

    case cartActionTypes.TOGGLE_CART_DROPDOWN_VISIBILITY:
      return { ...state, isDropdownVisible: !state.isDropdownVisible };

    case cartActionTypes.HIDE_CART_DROPDOWN:
      return { ...state, isDropdownVisible: false };

    case cartActionTypes.FETCH_USER_CART_ITEMS_SUCCESS:
      return { ...state, cartItems: payload, error: null };

    case cartActionTypes.UPDATE_USER_CART_ITEMS_SUCCESS:
      return { ...state, error: null };

    case cartActionTypes.FETCH_USER_CART_ITEMS_FAILURE:
    case cartActionTypes.UPDATE_USER_CART_ITEMS_FAILURE:
      return { ...state, error: payload };

    case cartActionTypes.CLEAR_CART:
      return { ...state, cartItems: [] };

    default:
      return state;
  }
};

export default cartReducer;
