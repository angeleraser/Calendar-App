import { eventSetActive } from "../../actions/calendar";

export const onDoubleClick = (e) => {
  return;
};
export const onSelectEvent = (dispatch) => {
  return (event) => {
    dispatch(eventSetActive({ ...event }));
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
