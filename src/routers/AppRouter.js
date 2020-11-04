import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";
import { startChecking } from "../actions/auth";
import { LoginScreen } from "../components/auth/LoginScreen";
import { CalendarScreen } from "../components/calendar/CalendarScreen";
import { LoadingScreen } from "../components/LoadingScreen/LoadingScreen";
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
    return <LoadingScreen />;
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
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};
