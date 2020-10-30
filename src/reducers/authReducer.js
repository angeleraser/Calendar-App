import { TYPES } from "../types/types";

const initState = {
  checking: true,
  uid: null,
  name: null,
};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case TYPES.authLogin:
      return {
        ...state,
        ...action.payload,
        checking: false,
      };
    case TYPES.authFinishChecking:
      return {
        ...state,
        checking: false,
      };
    case TYPES.authLogout:
      return {
        checking: false,
      };
    default:
      return state;
  }
};
