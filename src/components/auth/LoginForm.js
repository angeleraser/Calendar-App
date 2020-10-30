import React from "react";
import { useDispatch } from "react-redux";
import { startLogin } from "../../actions/auth";
import { useForm } from "../hooks/useForm";

export const LoginForm = () => {
  const [
      [loginFormValues],
      [handleLoginInputChange],
      handleLoginSubmit,
    ] = useForm({
      loginEmail: "pedrosete@gmail.com",
      loginPassword: "123456",
    }),
    dispatch = useDispatch(),
    { loginEmail, loginPassword } = loginFormValues,
    dispatchLoginActions = () => {
      dispatch(startLogin(loginEmail, loginPassword));
    };
  return (
    <div className="col-md-6 login-form-1">
      <h3>Ingreso</h3>
      <form onSubmit={handleLoginSubmit(dispatchLoginActions)}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Correo"
            name="loginEmail"
            value={loginEmail}
            onChange={handleLoginInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Contraseña"
            name="loginPassword"
            value={loginPassword}
            onChange={handleLoginInputChange}
          />
        </div>
        <div className="form-group">
          <input type="submit" className="btnSubmit" value="Login" />
        </div>
      </form>
    </div>
  );
};
