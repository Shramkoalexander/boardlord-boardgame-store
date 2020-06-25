export const getProperPrice = (item) => {
  let price = item.discount_pirce ? item.discount_pirce : item.price;
  price = parseInt(price);
  return price;
};
