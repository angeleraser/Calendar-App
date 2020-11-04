import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { startRegister } from "../../actions/auth";
import { useForm } from "../hooks/useForm";

export const RegisterForm = () => {
  const [
      [registerFormValues],
      [handleRegisterInputChange],
      handleRegisterSubmit,
    ] = useForm({
      registerName: "",
      registerEmail: "",
      registerPassword1: "",
      registerPassword2: "",
    }),
    {
      registerName,
      registerEmail,
      registerPassword1,
      registerPassword2,
    } = registerFormValues;
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.ui);
  const dispatchRegisterActions = () => {
    if (registerPassword1 === registerPassword2) {
      dispatch(startRegister(registerEmail, registerName, registerPassword1));
    } else {
      Swal.fire("Error", "Passwords should be equal.", "error");
    }
  };
  return (
    <div className="col-md-6 login-form-2">
      <h3>Sign Up</h3>
      <form onSubmit={handleRegisterSubmit(dispatchRegisterActions)}>
        <div className="form-group">
          <input
            required={true}
            type="text"
            className="form-control"
            placeholder="Name"
            value={registerName}
            onChange={handleRegisterInputChange}
            name="registerName"
          />
        </div>
        <div className="form-group">
          <input
            required={true}
            type="email"
            className="form-control"
            placeholder="email@example.com"
            value={registerEmail}
            onChange={handleRegisterInputChange}
            name="registerEmail"
          />
        </div>
        <div className="form-group">
          <input
            required={true}
            type="password"
            className="form-control"
            placeholder="Password"
            value={registerPassword1}
            onChange={handleRegisterInputChange}
            name="registerPassword1"
          />
        </div>

        <div className="form-group">
          <input
            required={true}
            type="password"
            className="form-control"
            placeholder="Repeat your password"
            value={registerPassword2}
            onChange={handleRegisterInputChange}
            name="registerPassword2"
          />
        </div>

        <div className="form-group">
          <button disabled={isLoading} className="btnSubmit" type="submit">
            {isLoading ? "Loading..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};
