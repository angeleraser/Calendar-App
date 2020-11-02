import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  startChecking,
  startLogin,
  startLogout,
  startRegister,
} from "../../actions/auth";
import { TYPES } from "../../types/types";
import Swal from "sweetalert2";
import * as fetchModule from "../../helpers/fetchData";
const mw = [thunk],
  mockStore = configureStore(mw),
  initState = {};
let reduxStore = mockStore(initState);
const testUserLogin = {
  email: "test123@gmail.com",
  password: "123456",
};
jest.setTimeout(600000);
Storage.prototype.setItem = jest.fn();
Swal.fire = jest.fn();
describe("Testing auth actions", () => {
  beforeEach(() => {
    reduxStore = mockStore(initState);
    jest.clearAllMocks();
  });

  test("should login correctly", async () => {
    await reduxStore.dispatch(
      startLogin(testUserLogin.email, testUserLogin.password)
    );
    const actions = reduxStore.getActions();
    const loginAction = actions[0];
    expect(loginAction).toEqual({
      type: TYPES.authLogin,
      payload: {
        name: expect.any(String),
        uid: expect.any(String),
      },
    });
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token",
      expect.any(String)
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-init-date",
      expect.any(Number)
    );
  });

  test("should not login correctly", async () => {
    // Incorrect password
    await reduxStore.dispatch(startLogin(testUserLogin.email, "2312321321312"));
    let actions = reduxStore.getActions();
    expect(actions.length).toBe(0);
    // Incorrect email
    await reduxStore.dispatch(startLogin("test12345@gmail.com", "123456"));
    expect(Swal.fire).toBeCalledWith("Error", "Password incorrecto", "error");
    expect(Swal.fire).toBeCalledWith(
      "Error",
      "El usuario no existe con ese email",
      "error"
    );
  });

  test("should register correctly", async () => {
    const newUser = {
      email: "testUser@gmail.com",
      name: "TestOne",
      password: "123456",
    };
    fetchModule.asyncFetchData = jest.fn().mockReturnValue({
      json() {
        return {
          ok: true,
          uid: "1f2b53n6muil543k2j1hg",
          name: newUser.name,
          token: "12f34g5h6j7k8ogfpdsa-098f7yvbhncdssox98c7d6strf2vb3n4",
        };
      },
    });
    await reduxStore.dispatch(
      startRegister(newUser.email, newUser.name, newUser.password)
    );
    const actions = reduxStore.getActions();
    expect(actions[0].type).toBe(TYPES.authLogin);
    expect(actions[0].payload).toEqual({
      uid: "1f2b53n6muil543k2j1hg",
      name: newUser.name,
    });
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token",
      expect.any(String)
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-init-date",
      expect.any(Number)
    );
  });

  test("should checking token correctly", async () => {
    const newUser = {
      email: "testUser@gmail.com",
      name: "TestOne",
      password: "123456",
    };
    fetchModule.asyncFetchData = jest.fn().mockReturnValue({
      json() {
        return {
          ok: true,
          uid: "1f2b53n6muil543k2j1hg",
          name: newUser.name,
          token: "12f34g5h6j7k8ogfpdsa-098f7yvbhncdssox98c7d6strf2vb3n4",
        };
      },
    });
    await reduxStore.dispatch(startChecking());
    const actions = reduxStore.getActions();
    expect(
      actions.some(
        (a) => a.type === TYPES.authLogin || TYPES.authFinishChecking
      )
    ).toBe(true);
  });

  test("should logout", async () => {
    Storage.prototype.clear = jest.fn();
    await reduxStore.dispatch(startLogout());
    const actions = reduxStore.getActions();
    expect(localStorage.clear).toHaveBeenCalled();
    expect(actions[0]).toEqual({
      type: TYPES.authLogout,
    });
  });
});
