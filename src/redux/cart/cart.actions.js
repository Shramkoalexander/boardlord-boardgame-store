import cartActionTypes from "./cart.types";

export const addItemToCart = (item) => ({
  type: cartActionTypes.ADD_ITEM_TO_CART,
  payload: item,
});

export const removeItemFromCart = (item) => ({
  type: cartActionTypes.REMOVE_ITEM_FROM_CART,
  payload: item,
});

export const clearItemFromCart = (item) => ({
  type: cartActionTypes.CLEAR_ITEM_FROM_CART,
  payload: item,
});

export const toggleCartDropdownVisibility = () => ({
  type: cartActionTypes.TOGGLE_CART_DROPDOWN_VISIBILITY,
});

export const hideCartDropdown = () => ({
  type: cartActionTypes.HIDE_CART_DROPDOWN,
});

export const clearCart = () => ({
  type: cartActionTypes.CLEAR_CART,
});

export const fetchUserCartItemsSuccess = (cartItems) => ({
  type: cartActionTypes.FETCH_USER_CART_ITEMS_SUCCESS,
  payload: cartItems,
});

export const fetchUserCartItemsFailure = (error) => ({
  type: cartActionTypes.FETCH_USER_CART_ITEMS_FAILURE,
  payload: error,
});

export const updateUserCartItemsSuccess = () => ({
  type: cartActionTypes.UPDATE_USER_CART_ITEMS_SUCCESS,
});

export const updateUserCartItemsFailure = (error) => ({
  type: cartActionTypes.UPDATE_USER_CART_ITEMS_FAILURE,
  payload: error,
});
