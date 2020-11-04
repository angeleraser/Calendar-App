import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogin } from "../../actions/auth";
import { useForm } from "../hooks/useForm";

export const LoginForm = () => {
  const [
    [loginFormValues],
    [handleLoginInputChange],
    handleLoginSubmit,
  ] = useForm({
    loginEmail: "",
    loginPassword: "",
  });
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.ui);
  const { loginEmail, loginPassword } = loginFormValues;
  const dispatchLoginActions = () => {
    dispatch(startLogin(loginEmail, loginPassword));
  };
  return (
    <div className="col-md-6 login-form-1">
      <h3>Login</h3>
      <form onSubmit={handleLoginSubmit(dispatchLoginActions)}>
        <div className="form-group">
          <input
            type="text"
            required={true}
            className="form-control"
            placeholder="Email"
            name="loginEmail"
            value={loginEmail}
            onChange={handleLoginInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            required={true}
            className="form-control"
            placeholder="Password"
            name="loginPassword"
            value={loginPassword}
            onChange={handleLoginInputChange}
          />
        </div>
        <div className="form-group">
          <button disabled={isLoading} className="btnSubmit" type="submit">
            {isLoading ? "Loading..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};
