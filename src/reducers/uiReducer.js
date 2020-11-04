import { TYPES } from "../types/types";

const initState = {
  isModalOpen: false,
  isLoading: false,
};

export const uiReducer = (state = initState, action) => {
  switch (action.type) {
    case TYPES.uiOpenModal:
      return {
        ...state,
        isModalOpen: true,
      };
    case TYPES.uiCloseModal:
      return {
        ...state,
        isModalOpen: false,
      };
    case TYPES.uiStartLoading:
      return {
        ...state,
        isLoading: true,
      };
    case TYPES.uiFinishLoading:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
