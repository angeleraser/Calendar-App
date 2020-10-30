import React from "react";
import "./login.css";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export const LoginScreen = () => {
  return (
    <div className="container login-container">
      <div className="row">
        <LoginForm />
        <RegisterForm />
      </div>
    </div>
  );
};
