import { all, call, put, select, takeLatest } from "redux-saga/effects";
import userActionTypes from "../user/user.types";
import { getUserCartRef } from "../../firebase/firebase.utils";
import { selectCartItems } from "./cart.selectors";
import cartActionTypes from "./cart.types";
import {
  fetchUserCartItemsFailure,
  fetchUserCartItemsSuccess,
  clearCart,
  updateUserCartItemsFailure,
  updateUserCartItemsSuccess,
} from "./cart.actions";
import { selectCurrentUser } from "../user/user.selectors";
import { mergeCartItems } from "./cart.utils";

export function* fetchUserCartItems({ payload }) {
  const userAuth = payload;

  try {
    if (!userAuth) return;
    const userId = userAuth.uid;
    const userCartRef = yield call(getUserCartRef, userId);
    const userCartSnapshot = yield userCartRef.get();
    const cartItemsFromDB = userCartSnapshot.data().cartItems;
    const cartItemsLocal = yield select(selectCartItems);

    let cartItems;

    if (cartItemsLocal.length > 0) {
      cartItems = yield mergeCartItems(cartItemsFromDB, cartItemsLocal);
      yield userCartRef.update({ cartItems });
    } else {
      cartItems = cartItemsFromDB;
    }

    yield put(fetchUserCartItemsSuccess(cartItems));
  } catch (error) {
    yield put(fetchUserCartItemsFailure(error));
  }
}

export function* updateUserCartInDB() {
  const currentUser = yield select(selectCurrentUser);
  if (currentUser) {
    try {
      const userCartRef = yield call(getUserCartRef, currentUser.id);
      const cartItems = yield select(selectCartItems);
      yield userCartRef.update({ cartItems });
      yield put(updateUserCartItemsSuccess());
    } catch (error) {
      yield put(updateUserCartItemsFailure(error));
    }
  }
}

export function* clearCartOnSignOut() {
  yield put(clearCart());
}

export function* onFetchAuthStateSuccess() {
  yield takeLatest(
    userActionTypes.FETCH_AUTH_STATE_SUCCESS,
    fetchUserCartItems
  );
}

export function* onSignOutSuccess() {
  yield takeLatest(userActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* onCartChange() {
  yield takeLatest(
    [
      cartActionTypes.ADD_ITEM_TO_CART,
      cartActionTypes.REMOVE_ITEM_FROM_CART,
      cartActionTypes.CLEAR_ITEM_FROM_CART,
      cartActionTypes.CLEAR_CART,
    ],
    updateUserCartInDB
  );
}

export function* cartSagas() {
  yield all([onFetchAuthStateSuccess(), onCartChange(), onSignOutSuccess()]);
}
