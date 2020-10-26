import moment from "moment";
import { TYPES } from "../types/types";
const initState = {
  events: [
    {
      title: "Learn React",
      start: moment().toDate(),
      end: moment().add(2, "hours").toDate(),
      bgColor: "#fafafa",
    },
  ],
  activeEvent: null,
};

export const calendarReducer = (state = initState, action) => {
  switch (action.type) {
    case TYPES.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload,
      };
    default:
      return state;
  }
};
