import { createSelector } from "reselect";

export const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectIsAuthentificationChecked = createSelector(
  [selectUser],
  (user) => user.isAuthentificationChecked
);

export const selectIsCurrenUserAuthentificated = createSelector(
  [selectUser],
  (user) => user.isCurrenUserAuthentificated
);

export const selectError = createSelector([selectUser], (user) => user.error);

export const selectErrorCode = createSelector([selectError], (error) =>
  error ? error.code : null
);

export const selectIsUserDropdownVisible = createSelector(
  [selectUser],
  (cart) => cart.isUserDropdownVisible
);

export const selectIsLoading = createSelector(
  [selectUser],
  (cart) => cart.isLoading
);
