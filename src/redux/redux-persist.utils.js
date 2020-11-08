import { createTransform } from "redux-persist";
import { store } from "./store";

export const cartTransform = createTransform(
  // transform state on its way to being serialized and persisted.
  (inboundState) => {
    const {
      user: { isCurrenUserAuthentificated },
    } = store.getState();

    return {
      ...inboundState,
      cartItems: isCurrenUserAuthentificated ? [] : inboundState.cartItems,
    };
  },
  // transform state being rehydrated
  (outboundState) => {
    return {
      ...outboundState,
    };
  },
  { whitelist: ["cart"] }
);

export const favoritesTransform = createTransform(
  // transform state on its way to being serialized and persisted.
  (inboundState) => {
    const {
      user: { isCurrenUserAuthentificated },
    } = store.getState();

    return {
      ...inboundState,
      cartItems: isCurrenUserAuthentificated ? [] : inboundState.favoriteItems,
    };
  },
  // transform state being rehydrated
  (outboundState) => {
    return {
      ...outboundState,
    };
  },
  { whitelist: ["favorites"] }
);
