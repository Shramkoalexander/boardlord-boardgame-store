export const currencyTypes = {
  RUB: "RUB",
};

export const getDiscountedPriceIfExist = (item) => {
  return hasDiscount(item.discount_pirce) ? item.discount_pirce : item.price;
};

export const getFormatedPrice = (currency, price) => {
  switch (currency) {
    case currencyTypes.RUB:
      return new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: `${currency}`,
        minimumFractionDigits: 0,
      }).format(price);

    default:
      break;
  }
};

export const hasDiscount = (discountPrice) => {
  return !!discountPrice;
};

export const isNew = (publishedString) => {
  const [month, year] = publishedString.split("/");
  const publishedDate = new Date(year, month);
  // hardcoded the today date on purpose to always show "New" tags, in real project don't pass anything to the constructor
  const today = new Date("2020", "06");
  const dateToCompareFreshness = new Date(today);
  dateToCompareFreshness.setMonth(today.getMonth() - 6);
  const isNew = publishedDate >= dateToCompareFreshness;
  return isNew;
};

export const isTop = (numUserRatings, averageUserRating) => {
  const isTop = numUserRatings >= 100 && averageUserRating >= 4.5;
  return isTop;
};
