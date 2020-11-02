import "@testing-library/jest-dom";
import { asyncFetchData } from "../../helpers/fetchData";
const testUserLogin = {
  email: "test123@gmail.com",
  password: "123456",
};
jest.setTimeout(60000);
describe("Testing helper asyncFetchData", () => {
  let token = null;

  test("should return data correctly without token", async () => {
    const response = await asyncFetchData("auth", {
      method: "POST",
      body: {
        ...testUserLogin,
      },
    });
    expect(response instanceof Response).toBe(true);
    const body = await response.json();
    console.log(body);
    expect(Object.keys(body).length).toBe(4);
    expect("token" in body && "name" in body).toBe(true);
    expect(body.ok).toBe(true);
    token = body.token;
  });

  test("should receive and validate token in backend", async () => {
    const response = await asyncFetchData("events/5f9aed23282309031cb1fb56", {
      method: "DELETE",
      token,
    });
    const body = await response.json();
    expect(body.msg).toBe("El evento no existe");
    expect(body.ok).toBe(false);
  });
});
