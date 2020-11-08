import { all } from "redux-saga/effects";
import { shopSagas } from "./shop/shop.sagas";
import { userSagas } from "./user/user.sagas";
import { cartSagas } from "./cart/cart.sagas";
import { favoritesSagas } from "./favorites/favorites.sagas";

export default function* rootSaga() {
  yield all([shopSagas(), userSagas(), cartSagas(), favoritesSagas()]);
}
