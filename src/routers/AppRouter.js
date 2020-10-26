import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { LoginScreen } from "../components/auth/LoginScreen";
import { CalendarScreen } from "../components/calendar/CalendarScreen";
export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/" component={CalendarScreen} />
        <Redirect to="/login" />
      </Switch>
    </BrowserRouter>
  );
};
