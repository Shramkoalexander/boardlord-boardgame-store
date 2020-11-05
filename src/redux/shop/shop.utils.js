import { hasDiscount } from "../../components/tag/tag.utils";

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
