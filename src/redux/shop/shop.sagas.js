import { takeLatest, take, put, cancelled, all } from "redux-saga/effects";
import shopActionTypes from "./shop.types";
import {
  firestore,
  convertSnapshotToProperCollection,
} from "../../firebase/firebase.utils";
import { fetchCollectionSuccess, fetchCollectionFailure } from "./shop.actions";
import { eventChannel } from "redux-saga";

export function* onFetchCollectionStart() {
  yield takeLatest(shopActionTypes.FETCH_COLLECTION_START, fetchCollection);
}

export function* fetchCollection() {
  const firestoreChannel = new eventChannel((emiter) => {
    const collectionRef = firestore.collection("collection");

    const unsubscribeFromSnapshot = collectionRef.onSnapshot(
      (snapshot) => {
        const collection = convertSnapshotToProperCollection(snapshot);
        emiter({ data: collection });
      },
      (error) => {
        emiter({ error });
      }
    );

    return () => {
      unsubscribeFromSnapshot();
    };
  });

  try {
    while (true) {
      const { data, error } = yield take(firestoreChannel);

      if (error) {
        yield put(fetchCollectionFailure(error));
      } else {
        yield put(fetchCollectionSuccess(data));
      }
    }
  } catch (error) {
    yield put(fetchCollectionFailure(error));
  } finally {
    if (yield cancelled()) {
      firestoreChannel.close();
    }
  }
}

export function* shopSagas() {
  yield all([onFetchCollectionStart()]);
}
