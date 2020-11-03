export const addItem = (cartItems, itemToAdd) => {
  const found = cartItems.find((item) => item.id === itemToAdd.id);

  if (found) {
    return cartItems.map((item) =>
      item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }

  return [...cartItems, { ...itemToAdd, quantity: 1 }];
};

export const removeItem = (cartItems, itemToRemove) => {
  const found = cartItems.find((item) => item.id === itemToRemove.id);

  if (found) {
    return found.quantity <= 1
      ? cartItems.filter((item) => item.id !== itemToRemove.id)
      : cartItems.map((item) =>
          item.id === itemToRemove.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
  }

  return cartItems;
};

export const clearItem = (cartItems, itemToClear) => {
  return cartItems.filter((item) => item.id !== itemToClear.id);
};

export const mergeCartItems = (cartItems1, cartItems2) => {
  const _cartItems1 = [...cartItems1];
  const _cartItems2 = [...cartItems2];

  _cartItems1.forEach((itemFrom1) => {
    const foundIndex = _cartItems2.findIndex(
      (itemFrom2) => itemFrom1.id === itemFrom2.id
    );

    if (foundIndex !== -1) {
      const sameCartItem = _cartItems2.splice(foundIndex, 1)[0];
      itemFrom1.quantity = itemFrom1.quantity + sameCartItem.quantity;
    }
  });

  const mergedCartItems = _cartItems1.concat(_cartItems2);

  return mergedCartItems;
};
