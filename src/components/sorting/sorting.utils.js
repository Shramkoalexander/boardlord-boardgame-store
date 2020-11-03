import { getDiscountedPriceIfExist } from "../../redux/shop/shop.utils";

export const sortTypeValues = {
  POPULAR: "popular",
  NAME_ASC: "name-asc",
  NAME_DESC: "name-desc",
  PRICE_ASC: "price-asc",
  PRICE_DESC: "price-desc",
};
export const sortCollectionsByType = (sortType, collection) => {
  const {
    POPULAR,
    NAME_ASC,
    NAME_DESC,
    PRICE_ASC,
    PRICE_DESC,
  } = sortTypeValues;
  let newCollection = [...collection];
  switch (sortType) {
    case POPULAR:
      newCollection.sort((a, b) => {
        if (parseInt(a.copies_sold, 10) < parseInt(b.copies_sold, 10)) {
          return 1;
        } else {
          return -1;
        }
      });
      break;
    case NAME_DESC:
      newCollection.sort((a, b) => {
        if (a.title < b.title) {
          return 1;
        } else {
          return -1;
        }
      });
      break;
    case NAME_ASC:
      newCollection.sort((a, b) => {
        if (a.title > b.title) {
          return 1;
        } else {
          return -1;
        }
      });
      break;
    case PRICE_ASC:
      newCollection.sort((a, b) => {
        if (
          parseInt(getDiscountedPriceIfExist(a), 10) <
          parseInt(getDiscountedPriceIfExist(b), 10)
        ) {
          return -1;
        } else {
          return 1;
        }
      });
      break;
    case PRICE_DESC:
      newCollection.sort((a, b) => {
        if (
          parseInt(getDiscountedPriceIfExist(a), 10) <
          parseInt(getDiscountedPriceIfExist(b), 10)
        ) {
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
