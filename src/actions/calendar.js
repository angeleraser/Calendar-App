import { TYPES } from "../types/types";

export const eventAddNew = (event) => {
  return {
    type: TYPES.eventAddNew,
    payload: event,
  };
};

export const eventSetActive = (event) => {
  return {
    type: TYPES.eventSetActive,
    payload: event,
  };
};
