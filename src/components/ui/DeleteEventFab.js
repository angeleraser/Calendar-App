import { useDispatch } from "react-redux";
import { eventStartDelete } from "../../actions/calendar";
export const DeleteEventFab = () => {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => {
        dispatch(eventStartDelete());
      }}
      className="fab-danger btn btn-danger">
      Delete <i className="fa fa-trash"></i>
    </button>
  );
};
