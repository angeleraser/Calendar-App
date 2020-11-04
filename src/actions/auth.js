/* eslint-disable no-unused-vars */
import Swal from "sweetalert2";
import { asyncFetchData } from "../helpers/fetchData";
import { TYPES } from "../types/types";
import { finishLoading, startLoading } from "./ui";
export const startLogin = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const response = await asyncFetchData("auth", {
        method: "POST",
        body: {
          email,
          password,
        },
      });
      const { name, uid, token, ok, msg, errors } = await response.json();
      // Save token to controls if is expired
      if (ok) {
        localStorage.setItem("token", token);
        localStorage.setItem("token-init-date", new Date().getTime());
        dispatch(login(name, uid));
      } else {
        Swal.fire("Error", msg, "error");
        dispatch(finishLoading());
      }
    } catch (error) {
      console.log(error);
      dispatch(finishLoading());
    }
  };
};

export const startRegister = (email, name, password) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const response = await asyncFetchData("auth/register", {
        method: "POST",
        body: {
          name,
          password,
          email,
        },
      });
      const body = await response.json();
      if (body.ok) {
        localStorage.setItem("token", body.token);
        localStorage.setItem("token-init-date", new Date().getTime());
        dispatch(login(body.name, body.uid));
      } else {
        Swal.fire("Error", body.msg, "error");
        dispatch(finishLoading());
      }
    } catch (error) {
      console.log(error);
      console.log("Register failed :(");
    }
  };
};

export const startChecking = () => {
  return async (dispatch) => {
    try {
      const response = await asyncFetchData("auth/renew-token", {
        method: "GET",
        token: localStorage.getItem("token") || "",
      });
      const data = await response.json();
      if (data.ok) {
        dispatch(login(data.name, data.uid));
      }
    } catch (error) {
      console.log(error);
      console.log("Checking token failed :(");
    } finally {
      dispatch(finishChecking());
    }
  };
};

export const finishChecking = () => ({
  type: TYPES.authFinishChecking,
});

export const login = (name, uid) => ({
  type: TYPES.authLogin,
  payload: {
    name,
    uid,
  },
});

// Se puede retonar dispatch si es necesario hacer mas operaciones o acciones incluso si no son asincronas
export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout());
  };
};

export const logout = () => ({
  type: TYPES.authLogout,
});
