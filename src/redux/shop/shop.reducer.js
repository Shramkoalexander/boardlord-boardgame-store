import { SHOP_DATA } from "./shop.data";

const initialState = SHOP_DATA;

const shopReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "":
      return;

    default:
      return state;
  }
};

export default shopReducer;
