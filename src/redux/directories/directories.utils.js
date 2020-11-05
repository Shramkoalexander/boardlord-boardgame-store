export const mapDirectoryItemsArrayToObject = (directoryItems) =>
  directoryItems.reduce((acc, { path, title }) => {
    return { ...acc, [path]: { title: title } };
  }, {});

export const mapProductsArrayToObject = (productsArray) =>
  productsArray.reduce((acc, item) => {
    return { ...acc, [item.alias]: { title: item.title } };
  }, {});
