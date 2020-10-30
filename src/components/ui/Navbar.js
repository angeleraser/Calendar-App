import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/auth";
import { eventLogoutCleanup } from "../../actions/calendar";
export const Navbar = () => {
  const { name: username } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  return (
    <nav className="navbar navbar-dark bg-dark mb-4">
      <span className="navbar-brand">{username}</span>
      <button
        onClick={() => {
          dispatch(startLogout());
          dispatch(eventLogoutCleanup());
        }}
        className="btn btn-outline-danger">
        Salir
      </button>
    </nav>
  );
};
