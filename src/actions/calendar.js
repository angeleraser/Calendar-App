/* eslint-disable no-unused-vars */
import Swal from "sweetalert2";
import { asyncFetchData } from "../helpers/fetchData";
import { prepareEvents } from "../helpers/prepareEvent";
import { TYPES } from "../types/types";

const eventAddNew = (event) => {
  return {
    type: TYPES.eventAddNew,
    payload: event,
  };
};

export const eventStartAddNew = (event) => {
  return async (dispatch, getState) => {
    try {
      console.log("Saving event...");
      Swal.fire({
        title: "Guardando evento...",
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
        console.log("Saving event done!");
      }
    } catch (error) {
      console.log(error);
      console.log("Saving event failed :(");
    } finally {
      console.log("Saving event process finished");
      Swal.close();
    }
  };
};

export const eventStartDelete = () => {
  return async (dispatch, getState) => {
    try {
      const {
        activeEvent: { id },
      } = getState().calendar;
      console.log("Deleting event...");
      const response = await asyncFetchData(`events/${id}`, {
        method: "DELETE",
        token: localStorage.getItem("token") || "",
      });
      const data = await response.json();
      if (data.ok) {
        dispatch(eventDeleted());
        console.log("Deleting event done!");
      } else {
        Swal.fire("Error", data.msg, "error");
        console.log("Deleting event failed error");
      }
    } catch (error) {
      console.log(error);
      console.log("Deleting event failed :(");
    }
  };
};

export const eventStartUpdate = (event) => {
  return async (dispatch) => {
    try {
      console.log("Updating event...");
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
        console.log("Updating event done!");
      } else {
        Swal.fire("Error", data.msg, "error");
        console.log("Updating event failed error");
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
    console.log("Loading events...");
    try {
      const response = await asyncFetchData("events", {
        method: "GET",
        token: localStorage.getItem("token") || "",
      });
      const { events } = await response.json();
      dispatch(eventLoaded(prepareEvents(events)));
      console.log("Loading events sucess!");
    } catch (error) {
      console.log(error);
      console.log("Loading events failed :(");
    } finally {
      console.log("Loading events process finished!");
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
