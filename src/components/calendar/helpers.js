import { eventSetActive } from "../../actions/calendar";
import { eventClearActiveEvent, openModal } from "../../actions/ui";

export const onDoubleClick = (dispatch) => {
  return (event) => {
    dispatch(openModal());
  };
};
export const onSelectEvent = (dispatch) => {
  return (event) => {
    dispatch(eventSetActive({ ...event }));
  };
};
export const onSelectSlot = (dispatch) => {
  return (e) => {
    dispatch(eventClearActiveEvent());
  };
};
export const onChangeView = (setLastView) => {
  return (e) => {
    setLastView(e);
    localStorage.setItem("last-view", e);
  };
};
export const eventStyleGetter = (activeUser) => {
  return (event, start, end, isSelected) => {
    const style = {
      backgroundColor: activeUser === event.user._id ? "#367cf7" : "#465660",
      borderRadius: "0px",
      opacity: "0.8",
      display: "block",
      color: "#fff",
    };
    return {
      style,
    };
  };
};
