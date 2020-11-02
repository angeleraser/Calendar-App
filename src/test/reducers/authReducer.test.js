const { login, logout } = require("../../actions/auth");
const { authReducer } = require("../../reducers/authReducer");

const initState = {
  checking: true,
  uid: null,
  name: null,
};

describe("Testing authReducer", () => {
  test("should return default state", () => {
    const state = authReducer(initState, {});
    expect(state).toEqual(initState);
  });

  test("should return data and checking false after login action", () => {
    const user = {
      name: "TestUser",
      uid: "221bh5j1245g6yvhj76h21",
    };
    const loggedState = authReducer(initState, login(user.name, user.uid));
    expect(loggedState).toEqual({
      checking: false,
      name: user.name,
      uid: user.uid,
    });
  });

  test("should return checking false", () => {
    const user = {
      name: "TestUser",
      uid: "221bh5j1245g6yvhj76h21",
    };
    const loggedState = authReducer(initState, login(user.name, user.uid));
    const logoutState = authReducer(loggedState, logout());
    expect(logoutState).toEqual({
      checking: false,
    });
  });
});
