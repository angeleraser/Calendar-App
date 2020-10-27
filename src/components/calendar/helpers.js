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
export const eventStyleGetter = (event, start, end, isSelected) => {
  const style = {
    backgroundColor: "#367cf7",
    borderRadius: "0px",
    opacity: "0.8",
    display: "block",
    color: "#fff",
  };
  return {
    style,
  };
};
