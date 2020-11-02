const { openModal, closeModal } = require("../../actions/ui");
const { uiReducer } = require("../../reducers/uiReducer");

const initState = {
  isModalOpen: false,
};

describe("Testing uiReducer", () => {
  test("should return defaultState", () => {
    const state = uiReducer(initState, {});
    expect(state).toEqual(initState);
  });
  test("should open and close modal", () => {
    const modalOpenState = uiReducer(initState, openModal());
    expect(modalOpenState).toEqual({
      isModalOpen: true,
    });
    const modalCloseState = uiReducer(modalOpenState, closeModal());
    expect(modalCloseState).toEqual({
      isModalOpen: false,
    });
    expect(modalCloseState).not.toEqual(modalOpenState);
  });
});
