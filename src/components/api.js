import axios from "axios";

const host = "https://vieclamvp.vn/api";

const api = {};

const logTime = async (method, url, fn) => {
  const fullUrl = `${host}${url}`;
  const start = performance.now();
  try {
    const response = await fn(fullUrl);
    const end = performance.now();
    console.log(
      `[${method.toUpperCase()}] ${fullUrl} - ${Math.round(end - start)}ms`
    );
    return response.data;
  } catch (error) {
    const end = performance.now();
    console.error(
      `[${method.toUpperCase()}] ${fullUrl} - Failed after ${Math.round(
        end - start
      )}ms`
    );
    throw error;
  }
};

const getHeaders = (token) => {
  return token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : {};
};

api.get = async (url, token = null) => {
  return logTime("get", url, (fullUrl) =>
    axios.get(fullUrl, getHeaders(token))
  );
};

api.post = async (url, data = {}, token = null) => {
  return logTime("post", url, (fullUrl) =>
    axios.post(fullUrl, data, getHeaders(token))
  );
};

api.patch = async (url, data = {}, token = null) => {
  return logTime("patch", url, (fullUrl) =>
    axios.patch(fullUrl, data, getHeaders(token))
  );
};

api.delete = async (url, token = null) => {
  return logTime("delete", url, (fullUrl) =>
    axios.delete(fullUrl, getHeaders(token))
  );
};

export default api;
