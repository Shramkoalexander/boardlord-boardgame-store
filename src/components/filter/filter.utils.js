import { getDiscountedPriceIfExist } from "../../redux/shop/shop.utils";

export const filterValues = {
  gameTime: {
    UNSET: "unset",
    SHORT: "short",
    MEDIUM: "medium",
    LONG: "long",
    VERY_LONG: "very_long",
    DIFFERENT: "different",
  },
  playersCount: {
    ALL: "all",
    COUNT: 8,
    MORE: "more",
  },
};

export const filterGameTime = (collection, gameTime) => {
  const { SHORT, MEDIUM, LONG, VERY_LONG, DIFFERENT } = filterValues.gameTime;
  let filteredCollection = collection;
  switch (gameTime) {
    case SHORT:
      filteredCollection = filteredCollection.filter((item) => {
        const average = (item.max_playtime + item.min_playtime) / 2;
        return average <= 45;
      });
      break;
    case MEDIUM:
      filteredCollection = filteredCollection.filter((item) => {
        const average = (item.max_playtime + item.min_playtime) / 2;
        return average > 45 && average <= 90;
      });
      break;
    case LONG:
      filteredCollection = filteredCollection.filter((item) => {
        const average = (item.max_playtime + item.min_playtime) / 2;
        return average > 90 && average <= 120;
      });
      break;
    case VERY_LONG:
      filteredCollection = filteredCollection.filter((item) => {
        const average = (item.max_playtime + item.min_playtime) / 2;
        return average > 120;
      });
      break;
    case DIFFERENT:
      filteredCollection = filteredCollection.filter(
        (item) => item.max_playtime - item.min_playtime >= 30
      );
      break;

    default:
      break;
  }
  return filteredCollection;
};

export const filterPrice = (collection, priceValues) => {
  let filteredCollection = collection.filter((item) => {
    const ItemPrice = getDiscountedPriceIfExist(item);
    return ItemPrice >= priceValues[0] && ItemPrice <= priceValues[1];
  });

  return filteredCollection;
};

export const filterPlayersCount = (collection, playersCount) => {
  const { MORE } = filterValues.playersCount;
  let filteredCollection = collection;

  if (parseInt(playersCount)) {
    filteredCollection = filteredCollection.filter(
      (item) =>
        item.max_players >= parseInt(playersCount) &&
        parseInt(playersCount) >= item.min_players
    );
  } else if (playersCount === MORE) {
    filteredCollection = filteredCollection.filter(
      (item) => parseInt(playersCount) > item.max_players
    );
  }

  return filteredCollection;
};

export const filterInStock = (collection, isInStock) => {
  let filteredCollection = collection;

  if (isInStock) {
    filteredCollection = filteredCollection.filter(
      (item) => item.inStockCount > 0
    );
  }

  return filteredCollection;
};
