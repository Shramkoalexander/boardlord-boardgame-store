import shopActionTypes from "./shop.types";

export const fetchCollectionStart = () => ({
  type: shopActionTypes.FETCH_COLLECTION_START,
});

export const fetchCollectionSuccess = (collection) => ({
  type: shopActionTypes.FETCH_COLLECTION_SUCCESS,
  payload: collection,
});

export const fetchCollectionFailure = (error) => ({
  type: shopActionTypes.FETCH_COLLECTION_FAILURE,
  payload: error,
});
