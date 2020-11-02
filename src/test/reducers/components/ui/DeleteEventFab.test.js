import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { DeleteEventFab } from "../../../../components/ui/DeleteEventFab";
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {};
const store = mockStore(initState);
store.dispatch = jest.fn();
const wrapper = render(
  <Provider store={store}>
    <DeleteEventFab />
  </Provider>
);
describe("Testing <DeleteEventFav/> component", () => {
  test("should render correctly", () => {
    expect(wrapper.container).toMatchSnapshot();
  });
});
