import { createSelector } from "reselect";

export const selectLightBox = (state) => state.lightBox;

export const selectIsLightBoxVisible = createSelector(
  [selectLightBox],
  (lightBox) => lightBox.isLightBoxVisible
);

export const selectCurrentImageIndex = createSelector(
  [selectLightBox],
  (lightBox) => lightBox.currentImageIndex
);
