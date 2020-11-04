import React from "react";
import "./login.css";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export const LoginScreen = () => {
  return (
    <div className="container login-container">
      <div className="row d-flex justify-content-center mb-4">
        <h2 className="text-primary">Calendar App <i className="fa fa-calendar"></i></h2>
      </div>
      <div className="row">
        <LoginForm />
        <RegisterForm />
      </div>
    </div>
  );
};
