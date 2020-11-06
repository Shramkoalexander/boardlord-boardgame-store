import lightBoxActionTypes from "./light-box.types";

const initialState = {
  isLightBoxVisible: false,
  currentImageIndex: 0,
};

const lightBoxReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case lightBoxActionTypes.HIDE_LIGHT_BOX:
      return { ...state, isLightBoxVisible: false };

    case lightBoxActionTypes.SHOW_LIGHT_BOX:
      return { ...state, isLightBoxVisible: true };

    case lightBoxActionTypes.INCREASE_CURRENT_IMAGE_INDEX:
      return { ...state, currentImageIndex: state.currentImageIndex + 1 };

    case lightBoxActionTypes.DECREASE_CURRENT_IMAGE_INDEX:
      return { ...state, currentImageIndex: state.currentImageIndex - 1 };

    case lightBoxActionTypes.SET_CURRENT_IMAGE_INDEX:
      return { ...state, currentImageIndex: payload };

    default:
      return state;
  }
};

export default lightBoxReducer;
