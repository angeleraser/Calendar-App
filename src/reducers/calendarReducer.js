import { TYPES } from "../types/types";
const initState = {
  events: [],
  activeEvent: null,
};

export const calendarReducer = (state = initState, action) => {
  switch (action.type) {
    case TYPES.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload,
      };
    case TYPES.eventAddNew:
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    case TYPES.eventClearActiveEvent:
      return {
        ...state,
        activeEvent: null,
      };
    case TYPES.eventUpdated:
      return {
        ...state,
        events: state.events.map((e) =>
          e.id === action.payload.id ? action.payload : e
        ),
      };
    case TYPES.eventDeleted:
      return {
        ...state,
        events: state.events.filter((e) => e.id !== state.activeEvent.id),
        activeEvent: null,
      };
    case TYPES.eventLoaded:
      return {
        ...state,
        events: [...action.payload],
      };
    case TYPES.eventLogoutCleanup:
      return { ...initState };
    default:
      return state;
  }
};
