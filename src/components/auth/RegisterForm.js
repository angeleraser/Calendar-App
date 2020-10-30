import React from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { startRegister } from "../../actions/auth";
import { useForm } from "../hooks/useForm";

export const RegisterForm = () => {
  const [
      [registerFormValues],
      [handleRegisterInputChange],
      handleRegisterSubmit,
    ] = useForm({
      registerName: "Angelo",
      registerEmail: "angelo123@gmail.com",
      registerPassword1: "123456",
      registerPassword2: "123456",
    }),
    {
      registerName,
      registerEmail,
      registerPassword1,
      registerPassword2,
    } = registerFormValues,
    dispatch = useDispatch(),
    dispatchRegisterActions = () => {
      if (registerPassword1 === registerPassword2) {
        dispatch(startRegister(registerEmail, registerName, registerPassword1));
      } else {
        Swal.fire("Error", "Las contrasenas deben ser iguales", "error");
      }
    };
  return (
    <div className="col-md-6 login-form-2">
      <h3>Registro</h3>
      <form onSubmit={handleRegisterSubmit(dispatchRegisterActions)}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Nombre"
            value={registerName}
            onChange={handleRegisterInputChange}
            name="registerName"
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="Correo"
            value={registerEmail}
            onChange={handleRegisterInputChange}
            name="registerEmail"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Contraseña"
            value={registerPassword1}
            onChange={handleRegisterInputChange}
            name="registerPassword1"
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Repita la contraseña"
            value={registerPassword2}
            onChange={handleRegisterInputChange}
            name="registerPassword2"
          />
        </div>

        <div className="form-group">
          <input type="submit" className="btnSubmit" value="Crear cuenta" />
        </div>
      </form>
    </div>
  );
};
