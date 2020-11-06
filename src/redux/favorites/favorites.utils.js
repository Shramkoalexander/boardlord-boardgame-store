export const toggleItem = (favoriteItems, itemToToggle) => {
  const found = favoriteItems.find((item) => item.id === itemToToggle.id);

  if (found) {
    return favoriteItems.filter((item) => item.id !== itemToToggle.id);
  }

  return [...favoriteItems, itemToToggle];
};

export const mergeFavoriteItems = (favoriteItems1, favoriteItems2) => {
  const _favoriteItems1 = [...favoriteItems1];
  const _favoriteItems2 = [...favoriteItems2];

  _favoriteItems1.forEach((itemFrom1) => {
    const foundIndex = _favoriteItems2.findIndex(
      (itemFrom2) => itemFrom1.id === itemFrom2.id
    );

    if (foundIndex !== -1) {
      _favoriteItems2.splice(foundIndex, 1);
    }
  });

  const mergedFavoriteItems = _favoriteItems1.concat(_favoriteItems2);

  return mergedFavoriteItems;
};
