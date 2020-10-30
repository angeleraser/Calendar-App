const baseURL = process.env.REACT_APP_API_URL;
export const asyncFetchData = (
  endpoint,
  { method = "GET", body, token } = {}
) => {
  const url = `${baseURL}/${endpoint}`,
    headers = {
      "Content-type": "application/json",
    };
  if (token) {
    headers["x-token"] = token;
  }
  if (method === "GET") {
    return fetch(url, {
      method,
      headers,
    });
  } else {
    return fetch(url, {
      method,
      headers,
      body: JSON.stringify(body),
    });
  }
};
