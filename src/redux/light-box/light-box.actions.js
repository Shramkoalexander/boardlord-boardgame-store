import lightBoxActionTypes from "./light-box.types";

export const showLightBox = () => ({
  type: lightBoxActionTypes.SHOW_LIGHT_BOX,
});

export const hideLightBox = () => ({
  type: lightBoxActionTypes.HIDE_LIGHT_BOX,
});

export const increaseCurrentImageIndex = () => ({
  type: lightBoxActionTypes.INCREASE_CURRENT_IMAGE_INDEX,
});

export const decreaseCurrentImageIndex = () => ({
  type: lightBoxActionTypes.DECREASE_CURRENT_IMAGE_INDEX,
});

export const setCurrentImageIndex = (payload) => ({
  type: lightBoxActionTypes.SET_CURRENT_IMAGE_INDEX,
  payload,
});
