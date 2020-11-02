/*

- npm install enzyme
- npm install enzyme-to-json
- npm install redux-mock-store
- npm install enzyme-adapter-react-16

 */
import "@testing-library/jest-dom";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { createSerializer } from "enzyme-to-json";
Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));
