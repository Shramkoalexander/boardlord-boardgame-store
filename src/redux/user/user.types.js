const userActionTypes = {
  TOGGLE_USER_DROPDOWN_VISIBILITY: "TOGGLE_USER_DROPDOWN_VISIBILITY",
  HIDE_USER_DROPDOWN: "HIDE_USER_DROPDOWN",
  SIGN_IN_WITH_GOOGLE_START: "SIGN_IN_WITH_GOOGLE_START",
  SIGN_IN_SUCCESS: "SIGN_IN_SUCCESS",
  SIGN_IN_FAILURE: "SIGN_IN_FAILURE",
  SIGN_IN_WITH_EMAIL_START: "SIGN_IN_WITH_EMAIL_START",
  SIGN_UP_START: "SIGN_UP_START",
  SIGN_UP_SUCCESS: "SIGN_UP_SUCCESS",
  SIGN_UP_FAILURE: "SIGN_UP_FAILURE",
  FETCH_AUTH_STATE_START: "FETCH_AUTH_STATE_START",
  FETCH_AUTH_STATE_SUCCESS: "FETCH_AUTH_STATE_SUCCESS",
  FETCH_AUTH_STATE_FAILURE: "FETCH_AUTH_STATE_FAILURE",
  FETCH_CURRENT_USER_SUCCESS: "FETCH_CURRENT_USER_SUCCESS",
  FETCH_CURRENT_USER_FAILURE: "FETCH_CURRENT_USER_FAILURE",
  SIGN_OUT_START: "SIGN_OUT_START",
  SIGN_OUT_SUCCESS: "SIGN_OUT_SUCCESS",
  SIGN_OUT_FAILURE: "SIGN_OUT_FAILURE",
  CLEAR_ERROR: "CLEAR_ERROR",
};

export default userActionTypes;
