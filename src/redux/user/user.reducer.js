import userActionTypes from "./user.types";

const initialState = {
  currentUser: null,
  isAuthentificationChecked: false,
  isCurrenUserAuthentificated: false,
  isUserDropdownVisible: false,
  error: null,
  isLoading: false,
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case userActionTypes.TOGGLE_USER_DROPDOWN_VISIBILITY:
      return { ...state, isUserDropdownVisible: !state.isUserDropdownVisible };

    case userActionTypes.HIDE_USER_DROPDOWN:
      return { ...state, isUserDropdownVisible: false };

    case userActionTypes.CLEAR_ERROR:
      return { ...state, error: null };

    case userActionTypes.SIGN_UP_START:
    case userActionTypes.SIGN_IN_WITH_EMAIL_START:
    case userActionTypes.SIGN_IN_WITH_GOOGLE_START:
      return { ...state, error: null, isLoading: true };

    case userActionTypes.SIGN_OUT_START:
    case userActionTypes.FETCH_AUTH_STATE_START:
      return { ...state, error: null };

    case userActionTypes.FETCH_CURRENT_USER_SUCCESS:
      return { ...state, currentUser: payload };

    case userActionTypes.FETCH_AUTH_STATE_SUCCESS:
      return {
        ...state,
        isAuthentificationChecked: true,
        isCurrenUserAuthentificated: !!payload,
      };

    case userActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        isCurrenUserAuthentificated: false,
      };

    case userActionTypes.SIGN_IN_SUCCESS:
      return { ...state, isLoading: false };

    case userActionTypes.SIGN_IN_FAILURE:
    case userActionTypes.SIGN_UP_FAILURE:
      return { ...state, error: payload, isLoading: false };

    case userActionTypes.SIGN_OUT_FAILURE:
    case userActionTypes.FETCH_CURRENT_USER_FAILURE:
    case userActionTypes.FETCH_AUTH_STATE_FAILURE:
      return { ...state, error: payload };

    default:
      return state;
  }
};

export default userReducer;
