import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { eventStartDelete } from "../../actions/calendar";
export const DeleteEventFab = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);
  return (
    <button
      disabled={isLoading}
      onClick={() => {
        dispatch(eventStartDelete(setIsLoading));
      }}
      className="fab-danger btn btn-danger">
      {" "}
      {isLoading ? "Deleting..." : "Delete"} <i className="fa fa-trash"></i>
    </button>
  );
};
