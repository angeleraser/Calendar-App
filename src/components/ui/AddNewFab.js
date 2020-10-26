import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../actions/ui";

export const AddNewFab = () => {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => {
        dispatch(openModal());
      }}
      className="fab btn btn-primary">
      Add
    </button>
  );
};
