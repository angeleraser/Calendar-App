import { asyncFetchData } from "../helpers/fetchData";
import { TYPES } from "../types/types";
export const startLogin = (email, password) => {
  return async (dispatch) => {
    console.log("Login...");
    const response = await asyncFetchData("auth", { email, password }).method(
        "POST"
      ),
      { name, uid, token } = await response.json();
    // Save token to controls if is expired
    localStorage.setItem("token", token);
    localStorage.setItem("token-init-date", new Date().getTime());
    dispatch(login(name, uid));
    console.log("Finish login!");
  };
};
export const login = (name, uid) => ({
  type: TYPES.authLogin,
  payload: {
    name,
    uid,
  },
});
