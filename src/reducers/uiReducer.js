import { TYPES } from "../types/types";

const initState = {
  isModalOpen: false,
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
    default:
      return state;
  }
};
