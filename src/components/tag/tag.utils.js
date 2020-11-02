export const tagTypes = {
  DISCOUNT: "DISCOUNT",
  TOP: "TOP",
  NEW: "NEW",
};

export const hasDiscount = (discountPrice) => {
  return !!discountPrice;
};

export const isNew = (publishedString) => {
  const [month, year] = publishedString.split("/");
  const publishedDate = new Date(year, month);
  // hardcoded the today date to show "New" tags, in real project don't pass anything to the constructor
  const today = new Date("2020", "06");
  const dateToCompareFreshness = new Date();
  dateToCompareFreshness.setMonth(today.getMonth() - 6);
  const isNew = publishedDate >= dateToCompareFreshness;
  return isNew;
};

export const isTop = (numUserRatings, averageUserRating) => {
  const isTop = numUserRatings >= 100 && averageUserRating >= 4.5;
  return isTop;
};
