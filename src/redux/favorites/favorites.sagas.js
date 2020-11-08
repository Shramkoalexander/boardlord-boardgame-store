import { all, call, put, select, takeLatest } from "redux-saga/effects";
import userActionTypes from "../user/user.types";
import { selectCurrentUser } from "../user/user.selectors";
import { selectFavoriteItems } from "./favorites.selectors";
import { getUserFavoritesRef } from "../../firebase/firebase.utils";
import {
  clearFavorites,
  fetchUserFavoriteItemsFailure,
  fetchUserFavoriteItemsSuccess,
  updateUserFavoriteItemsFailure,
  updateUserFavoriteItemsSuccess,
} from "./favorites.actions";
import favoritesActionTypes from "./favorites.types";
import { mergeFavoriteItems } from "./favorites.utils";

export function* fetchUserFavoriteItems({ payload }) {
  const userAuth = payload;

  try {
    if (!userAuth) return;
    const userId = userAuth.uid;
    const favoritesRef = yield call(getUserFavoritesRef, userId);
    const favoritesSnapshot = yield favoritesRef.get();
    const favoriteItemsFromDB = favoritesSnapshot.data().favoriteItems;
    const favoriteItemsLocal = yield select(selectFavoriteItems);

    let favoriteItems;

    if (favoriteItemsLocal.length > 0) {
      favoriteItems = yield mergeFavoriteItems(
        favoriteItemsFromDB,
        favoriteItemsLocal
      );
      yield favoritesRef.update({ favoriteItems });
    } else {
      favoriteItems = favoriteItemsFromDB;
    }

    yield put(fetchUserFavoriteItemsSuccess(favoriteItems));
  } catch (error) {
    yield put(fetchUserFavoriteItemsFailure(error));
  }
}

export function* updateUserFavoritesInDB() {
  const currentUser = yield select(selectCurrentUser);
  if (currentUser) {
    try {
      const favoriteItemsRef = yield call(getUserFavoritesRef, currentUser.id);
      const favoriteItems = yield select(selectFavoriteItems);
      yield favoriteItemsRef.update({ favoriteItems });
      yield put(updateUserFavoriteItemsSuccess());
    } catch (error) {
      yield put(updateUserFavoriteItemsFailure(error));
    }
  }
}

export function* clearFavoritesOnSignOut() {
  yield put(clearFavorites());
}

export function* onSignInSuccess() {
  yield takeLatest(
    userActionTypes.FETCH_AUTH_STATE_SUCCESS,
    fetchUserFavoriteItems
  );
}

export function* onSignOutSuccess() {
  yield takeLatest(userActionTypes.SIGN_OUT_SUCCESS, clearFavoritesOnSignOut);
}

export function* onFavoritesChange() {
  yield takeLatest(
    [
      favoritesActionTypes.CLEAR_FAVORITES,
      favoritesActionTypes.TOGGLE_FAVORITE,
    ],
    updateUserFavoritesInDB
  );
}

export function* favoritesSagas() {
  yield all([onSignInSuccess(), onFavoritesChange(), onSignOutSuccess()]);
}
