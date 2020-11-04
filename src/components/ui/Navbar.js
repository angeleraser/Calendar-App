import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/auth";
import { eventLogoutCleanup } from "../../actions/calendar";
export const Navbar = () => {
  const { name: username } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  return (
    <nav className="navbar navbar-dark bg-dark">
      <span className="navbar-brand">
        <i className="fa fa-user mr-2"></i>
        {username}
      </span>
      <button
        onClick={() => {
          dispatch(startLogout());
          dispatch(eventLogoutCleanup());
        }}
        className="btn btn-outline-danger">
        <i className="fa fa-close"></i> Logout
      </button>
    </nav>
  );
};
