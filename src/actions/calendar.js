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

export const eventUpdated = (event) => ({
  type: TYPES.eventUpdated,
  payload: event,
});

export const eventDeleted = (event) => ({
  type: TYPES.eventDeleted,
  payload: event,
});
