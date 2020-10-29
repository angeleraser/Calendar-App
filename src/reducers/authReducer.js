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
      };
    default:
      return state;
  }
};
