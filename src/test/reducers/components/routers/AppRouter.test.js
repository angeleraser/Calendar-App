import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { AppRouter } from "../../../../routers/AppRouter";
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
describe("Testing <AppRouter/> component", () => {
  test("should render LoadingScreen", () => {
    const initState = {
      auth: {
        checking: true,
      },
    };
    const store = mockStore(initState);
    const wrapper = render(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  test("should render LoginScreen", () => {
    const initState = {
      auth: {
        checking: false,
      },
    };
    const store = mockStore(initState);
    const wrapper = render(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
  test("should render CalendarScreen", () => {
    const initState = {
      auth: {
        checking: false,
        name: "Pedroso",
        uid: "asdske2131j4b5k4123hjv42",
      },
      ui: {
        isModalOpen: false,
      },
      calendar: {
        events: [],
        activeEvent: null,
      },
    };
    const store = mockStore(initState);
    const wrapper = render(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
