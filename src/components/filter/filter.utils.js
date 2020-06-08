export const filterValues = {
  gameTime: {
    undef: "undefined",
    short: "short",
    medium: "medium",
    long: "long",
    veryLong: "very_long",
    different: "different",
  },
  playersCount: {
    all: "all",
    count: 8,
    more: "more",
  },
};

export const getPlayersCountArray = (count) => {
  const countArray = [];
  for (let i = 1; i <= count; i++) {
    countArray.push(i);
  }
  return countArray;
};

export const filterGameTime = (collection, gameTime) => {
  const { short, medium, long, veryLong, different } = filterValues.gameTime;
  let filteredCollection = collection;
  switch (gameTime) {
    case short:
      filteredCollection = filteredCollection.filter((item) => {
        const average = (item.max_playtime + item.min_playtime) / 2;
        return average <= 45;
      });
      break;
    case medium:
      filteredCollection = filteredCollection.filter((item) => {
        const average = (item.max_playtime + item.min_playtime) / 2;
        return average > 45 && average <= 90;
      });
      break;
    case long:
      filteredCollection = filteredCollection.filter((item) => {
        const average = (item.max_playtime + item.min_playtime) / 2;
        return average > 90 && average <= 120;
      });
      break;
    case veryLong:
      filteredCollection = filteredCollection.filter((item) => {
        const average = (item.max_playtime + item.min_playtime) / 2;
        return average > 120;
      });
      break;
    case different:
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
    const ItemPrice = item.discount_pirce ? item.discount_pirce : item.price;
    return ItemPrice >= priceValues[0] && ItemPrice <= priceValues[1];
  });

  return filteredCollection;
};

export const filterPlayersCount = (collection, playersCount) => {
  const { more } = filterValues.playersCount;
  let filteredCollection = collection;

  if (parseInt(playersCount)) {
    filteredCollection = filteredCollection.filter(
      (item) =>
        item.max_players >= parseInt(playersCount) &&
        parseInt(playersCount) >= item.min_players
    );
  } else if (playersCount === more) {
    filteredCollection = filteredCollection.filter(
      (item) => parseInt(playersCount) > item.max_players
    );
  }

  return filteredCollection;
};

export const filterInStock = (collection, isInStock) => {
  let filteredCollection = collection;

  if (isInStock) {
    filteredCollection = filteredCollection.filter((item) => item.quantity > 0);
  }

  return filteredCollection;
};
