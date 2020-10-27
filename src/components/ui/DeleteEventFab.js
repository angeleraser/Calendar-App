import { useDispatch, useSelector } from "react-redux";
import { eventDeleted } from "../../actions/calendar";
import { eventClearActiveEvent } from "../../actions/ui";
export const DeleteEventFab = () => {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => {
        dispatch(eventDeleted());
      }}
      className="fab-danger btn btn-danger">
      Delete <i className="fa fa-trash"></i>
    </button>
  );
};
