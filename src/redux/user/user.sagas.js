import {
  takeLatest,
  take,
  put,
  cancelled,
  all,
  call,
} from "redux-saga/effects";
import {
  firestore,
  auth,
  googleProvider,
  createUserProfileDocument,
} from "../../firebase/firebase.utils";
import { eventChannel } from "redux-saga";
import userActionTypes from "./user.types";
import {
  signInSuccess,
  signInFailure,
  signUpSuccess,
  signUpFailure,
  fetchCurrentUserFailure,
  fetchCurrentUserSuccess,
  fetchAuthStateFailure,
  fetchAuthStateSuccess,
  signOutSuccess,
  signOutFailure,
} from "./user.actions";

export function* onSignInWithGoogle() {
  yield takeLatest(userActionTypes.SIGN_IN_WITH_GOOGLE_START, signInWighGoogle);
}

export function* onSignInWithEmail() {
  yield takeLatest(userActionTypes.SIGN_IN_WITH_EMAIL_START, signInWighEmail);
}

export function* onSignUpStart() {
  yield takeLatest(userActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(userActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onFetchAuthStateStart() {
  yield takeLatest(userActionTypes.FETCH_AUTH_STATE_START, fetchAuthState);
}

export function* onFetchAuthStateSuccess() {
  yield takeLatest(userActionTypes.FETCH_AUTH_STATE_SUCCESS, fetchCurrentUser);
}

export function* onSignOutStart() {
  yield takeLatest(userActionTypes.SIGN_OUT_START, signOut);
}

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* signInWighGoogle() {
  try {
    const { user: userAuth } = yield auth.signInWithPopup(googleProvider);

    yield call(createUserProfileDocument, userAuth);

    yield put(signInSuccess());
  } catch (error) {
    yield put(signInFailure(error));
  }
}
export function* signInWighEmail({ payload: { email, password } }) {
  try {
    yield auth.signInWithEmailAndPassword(email, password);
    yield put(signInSuccess());
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user: userAuth } = yield auth.createUserWithEmailAndPassword(
      email,
      password
    );

    yield put(signUpSuccess({ userAuth, extraData: { displayName } }));
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

export function* signInAfterSignUp({ payload: { userAuth, extraData } }) {
  try {
    yield call(createUserProfileDocument, userAuth, extraData);
    yield put(signInSuccess());
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* fetchCurrentUser({ payload }) {
  const userAuth = payload;

  if (!userAuth) return;
  const firestoreChannel = new eventChannel((emiter) => {
    const userRef = firestore.doc(`/users/${userAuth.uid}`);

    const unsubscribe = userRef.onSnapshot(
      (snapshot) => {
        const currentUser = {
          id: userRef.id,
          ...snapshot.data(),
        };

        emiter({ data: currentUser });
      },
      (error) => {
        emiter({ error });
      }
    );

    return () => {
      if (unsubscribe) unsubscribe();
    };
  });

  try {
    while (true) {
      const { data: currentUser, error } = yield take(firestoreChannel);

      if (error) {
        yield put(fetchCurrentUserFailure(error));
      } else {
        yield put(fetchCurrentUserSuccess(currentUser));
      }
    }
  } catch (error) {
    yield put(fetchCurrentUserFailure(error));
  } finally {
    if (yield cancelled()) {
      firestoreChannel.close();
    }
  }
}

export function* fetchAuthState() {
  const firestoreChannel = new eventChannel((emiter) => {
    const unsubscribe = auth.onAuthStateChanged(
      (userAuth) => {
        emiter({ data: userAuth });
      },
      (error) => {
        emiter({ error });
      }
    );

    return () => {
      unsubscribe();
    };
  });

  try {
    while (true) {
      const { data: userAuth, error } = yield take(firestoreChannel);
      if (error) {
        yield put(fetchAuthStateFailure(error));
      } else {
        yield put(fetchAuthStateSuccess(userAuth));
      }
    }
  } catch (error) {
    yield put(fetchAuthStateFailure(error));
  } finally {
    if (yield cancelled()) {
      firestoreChannel.close();
    }
  }
}

export function* userSagas() {
  yield all([
    onSignInWithGoogle(),
    onSignInWithEmail(),
    onSignUpStart(),
    onSignUpSuccess(),
    onFetchAuthStateStart(),
    onFetchAuthStateSuccess(),
    onSignOutStart(),
  ]);
}
