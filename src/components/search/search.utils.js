export const findCollectionItems = (collection, input) => {
  const properInput = input.toLowerCase().trim();
  let foundCollection = [];
  if (properInput.length > 0) {
    foundCollection = collection.filter((item) => {
      const title = item.title.toLowerCase().trim();
      const regExp = new RegExp(`(\\s|^)${properInput}`);
      const isMatch = title.match(regExp);
      return isMatch;
    });
  }

  return foundCollection;
};
