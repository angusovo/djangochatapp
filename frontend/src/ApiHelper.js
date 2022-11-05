import axios from "axios";

const BASE_URL = "http://localhost:8000";

export const login = (body) => {
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  axios({
    method: "post",
    url: `${BASE_URL}/api/auth/`,
    data: body,
    headers: headers,
  }).then((res) => {
    console.log(res);
  });
};

export const logout = (body) => {
  axios.post(`${BASE_URL}/api/auth/`, { body }).then((res) => {});
};

export const createUser = (body) => {
  let headers = { "Content-Type": "multipart/form-data" };
  axios({
    method: "post",
    url: `${BASE_URL}/api/user/`,
    data: body,
    headers: headers,
  }).then((res) => {
    console.log(res);
  });
};

export const saveMessage = (body) => {
  axios.post(`${BASE_URL}/api/message/`, { body }).then((res) => {});
};

export const getAllMessage = async () => {
  let res = await axios.get(`${BASE_URL}/api/message/`);
  return res.data;
};
