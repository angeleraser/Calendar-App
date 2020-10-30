import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";
import { startChecking } from "../actions/auth";
import { LoginScreen } from "../components/auth/LoginScreen";
import { CalendarScreen } from "../components/calendar/CalendarScreen";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoutes";
export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector(({ auth }) => auth);
  // Check if token is valid
  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);
  if (checking) {
    return <h1>Loading...</h1>;
  }
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute
          isAuthenticated={!!uid}
          exact
          path="/login"
          component={LoginScreen}
        />
        <PrivateRoute
          isAuthenticated={!!uid}
          exact
          path="/"
          component={CalendarScreen}
        />
        <Redirect to="/login" />
      </Switch>
    </BrowserRouter>
  );
};
