import { Redirect, Route } from "react-router-dom";
export const PublicRoute = ({
  path,
  component: Component,
  isAuthenticated,
  ...rest
}) => {
  return (
    <Route
      path={path}
      {...rest}
      component={(props) => {
        return !isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        );
      }}
    />
  );
};
