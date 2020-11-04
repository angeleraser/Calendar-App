/* eslint-disable no-unused-vars */
import Swal from "sweetalert2";
import { asyncFetchData } from "../helpers/fetchData";
import { prepareEvents } from "../helpers/prepareEvent";
import { TYPES } from "../types/types";
import { finishLoading, startLoading } from "./ui";

const eventAddNew = (event) => {
  return {
    type: TYPES.eventAddNew,
    payload: event,
  };
};

export const eventStartAddNew = (event) => {
  return async (dispatch, getState) => {
    try {
      Swal.fire({
        title: "Saving...",
        allowOutsideClick: false,
        willOpen() {
          Swal.showLoading();
        },
      });
      const response = await asyncFetchData("events", {
        method: "POST",
        body: {
          ...event,
        },
        token: localStorage.getItem("token") || "",
      });
      const data = await response.json();
      if (data.ok) {
        const {
          auth: { uid, name },
        } = getState();
        const newEvent = {
          ...event,
          id: data.event.id,
          user: {
            _id: uid,
            name,
          },
        };
        dispatch(eventAddNew(newEvent));
      }
    } catch (error) {
      console.log(error);
    } finally {
      Swal.close();
    }
  };
};

export const eventStartDelete = (setIsLoading) => {
  return async (dispatch, getState) => {
    try {
      setIsLoading(true);
      const {
        activeEvent: { id },
      } = getState().calendar;
      const response = await asyncFetchData(`events/${id}`, {
        method: "DELETE",
        token: localStorage.getItem("token") || "",
      });
      const data = await response.json();
      if (data.ok) {
        dispatch(eventDeleted());
      } else {
        Swal.fire("Error", data.msg, "error");
      }
    } catch (error) {
      console.log(error);
    } 
  };
};

export const eventStartUpdate = (event) => {
  return async (dispatch) => {
    try {
      const response = await asyncFetchData(`events/${event.id}`, {
        method: "PUT",
        body: {
          ...event,
        },
        token: localStorage.getItem("token") || "",
      });
      const data = await response.json();
      if (data.ok) {
        dispatch(eventUpdated(event));
      } else {
        Swal.fire("Error", data.msg, "error");
      }
    } catch (error) {
      console.log(error);
      console.log("Updating event failed :(");
    }
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

export const eventDeleted = () => ({
  type: TYPES.eventDeleted,
});

export const eventStartLoading = () => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const response = await asyncFetchData("events", {
        method: "GET",
        token: localStorage.getItem("token") || "",
      });
      const { events } = await response.json();
      dispatch(eventLoaded(prepareEvents(events)));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(finishLoading());
    }
  };
};

const eventLoaded = (events) => {
  return {
    type: TYPES.eventLoaded,
    payload: events,
  };
};

export const eventLogoutCleanup = () => ({ type: TYPES.eventLogoutCleanup });
