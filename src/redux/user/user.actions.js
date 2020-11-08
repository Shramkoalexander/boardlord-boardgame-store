import userActionTypes from "./user.types";

export const setCurrentUser = (payload) => ({
  type: userActionTypes.SET_CURRENT_USER,
  payload,
});

export const signInWithGoogleStart = () => ({
  type: userActionTypes.SIGN_IN_WITH_GOOGLE_START,
});

export const signInWithEmailStart = (emailAndPassword) => ({
  type: userActionTypes.SIGN_IN_WITH_EMAIL_START,
  payload: emailAndPassword,
});

export const signUpStart = (userCredentials) => ({
  type: userActionTypes.SIGN_UP_START,
  payload: userCredentials,
});

export const fetchAuthStateStart = () => ({
  type: userActionTypes.FETCH_AUTH_STATE_START,
});

export const signUpSuccess = ({ userAuth, extraData }) => ({
  type: userActionTypes.SIGN_UP_SUCCESS,
  payload: { userAuth, extraData },
});

export const signUpFailure = (error) => ({
  type: userActionTypes.SIGN_UP_FAILURE,
  payload: error,
});

export const signInSuccess = () => ({
  type: userActionTypes.SIGN_IN_SUCCESS,
});

export const signInFailure = (error) => ({
  type: userActionTypes.SIGN_IN_FAILURE,
  payload: error,
});

export const fetchCurrentUserSuccess = (currentUser) => ({
  type: userActionTypes.FETCH_CURRENT_USER_SUCCESS,
  payload: currentUser,
});

export const fetchCurrentUserFailure = (error) => ({
  type: userActionTypes.FETCH_CURRENT_USER_FAILURE,
  payload: error,
});

export const fetchAuthStateSuccess = (userAuth) => ({
  type: userActionTypes.FETCH_AUTH_STATE_SUCCESS,
  payload: userAuth,
});

export const fetchAuthStateFailure = (error) => ({
  type: userActionTypes.FETCH_AUTH_STATE_FAILURE,
  payload: error,
});

export const signOutStart = () => ({
  type: userActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: userActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = (error) => ({
  type: userActionTypes.SIGN_OUT_FAILURE,
  payload: error,
});

export const clearError = () => ({
  type: userActionTypes.CLEAR_ERROR,
});

export const toggleUserDropdownVisibility = () => ({
  type: userActionTypes.TOGGLE_USER_DROPDOWN_VISIBILITY,
});

export const hideUserDropdown = () => ({
  type: userActionTypes.HIDE_USER_DROPDOWN,
});
