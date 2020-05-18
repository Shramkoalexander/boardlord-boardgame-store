export const sortCollectionsByType = (sortType, collection) => {
  let newCollection = [...collection];
  switch (sortType) {
    case "popular":
      newCollection.sort((a, b) => {
        if (parseInt(a.copies_sold, 10) < parseInt(b.copies_sold, 10)) {
          return 1;
        } else {
          return -1;
        }
      });
      break;
    case "name-asc":
      newCollection.sort((a, b) => {
        if (a.title < b.title) {
          return 1;
        } else {
          return -1;
        }
      });
      break;
    case "name-desc":
      newCollection.sort((a, b) => {
        if (a.title > b.title) {
          return 1;
        } else {
          return -1;
        }
      });
      break;
    case "price-asc":
      newCollection.sort((a, b) => {
        if (parseInt(a.price, 10) < parseInt(b.price, 10)) {
          return -1;
        } else {
          return 1;
        }
      });
      break;
    case "price-desc":
      newCollection.sort((a, b) => {
        if (parseInt(a.price, 10) < parseInt(b.price, 10)) {
          return 1;
        } else {
          return -1;
        }
      });
      break;

    default:
      break;
  }

  return newCollection;
};
