const baseURL = process.env.REACT_APP_API_URL;
export const asyncFetchData = (endpoint, data = {}, { token = null } = {}) => {
  const url = `${baseURL}/${endpoint}`,
    headers = {
      "Content-type": "application/json",
    };
  if (token) {
    headers["x-token"] = token;
  }
  return {
    method(name = "GET") {
      return fetch(url, {
        method: name,
        headers: headers,
        body: JSON.stringify(data),
      });
    },
  };
};
