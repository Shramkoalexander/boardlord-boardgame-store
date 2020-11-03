import { createSelector } from "reselect";
import { hasDiscount } from "../../components/tag/tag.utils";
import { getDiscountedPriceIfExist } from "../shop/shop.utils";

export const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce((acc, item) => acc + item.quantity, 0)
);

export const selectCartItemsOverallDiscount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (acc, item) =>
        acc +
        (hasDiscount(item.discount_pirce)
          ? (item.price - item.discount_pirce) * item.quantity
          : 0),
      0
    )
);

export const selectCartItemsTotal = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
);

export const selectCartItemsTotalWithDiscount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (acc, item) => acc + getDiscountedPriceIfExist(item) * item.quantity,
      0
    )
);

export const selectIsCartDropdownVisible = createSelector(
  [selectCart],
  (cart) => cart.isDropdownVisible
);

export const selectIsItemInCart = (itemToFind) =>
  createSelector(
    [selectCartItems],
    (cartItems) => !!cartItems.find((item) => item.id === itemToFind.id)
  );
