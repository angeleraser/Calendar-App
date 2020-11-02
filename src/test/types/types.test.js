import "@testing-library/jest-dom";
import { TYPES } from "../../types/types";
describe("Testing TYPES", () => {
  test("should be equal", () => {
    expect(TYPES).toEqual({
      uiOpenModal: "[UI] Open Modal",
      uiCloseModal: "[UI] Close Modal",

      eventSetActive: "[Event] Set active",
      eventLogoutCleanup: "[Event] Logout cleanup",
      eventClearActiveEvent: "[Event] Clear active event",
      eventLoaded: "[Event] Loaded",
      eventStartAddNew: "[Event] Start add new",
      eventAddNew: "[Event] Add new",
      eventUpdated: "[Event] Updated",
      eventDeleted: "[Event] Deleted",

      authChecking: "[Auth] Checking login state",
      authFinishChecking: "[Auth] Finish checking login state",
      authStartLogin: "[Auth] Start login",
      authLogin: "[Auth] Login",
      authStartRegister: "[Auth] Start register",
      authStartTokenRenew: "[Auth] Start token renew",
      authLogout: "[Auth] Logout",
    });
  });
});
