import axios from "axios";
import moment from "moment";
import { createBrowserHistory } from "history";

const BASE_URL = "http://localhost:8000";
const history = createBrowserHistory();

const saveTokens = (data) => {
  localStorage.setItem("token", data);
  const expiredDateTime = moment().add(15000, "seconds");
  localStorage.setItem("TokenExpiredDateTime", expiredDateTime.toString());
};

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

export const createUser = async (body) => {
  let headers = { "Content-Type": "multipart/form-data" };
  let resp = await axios({
    method: "post",
    url: `${BASE_URL}/api/user/`,
    data: body,
    headers: headers,
  });
  if (resp.status == 200) {
    saveTokens(resp.data.token);
    return resp;
  }
};

export const saveMessage = (body) => {
  axios.post(`${BASE_URL}/api/message/`, { body }).then((res) => {});
};

export const getRmMessage = async (id) => {
  let res = await axios.get(`${BASE_URL}/api/message/?id=${id}`);
  return res.data;
};

export const getAllRooms = async () => {
  let res = await axios.get(`${BASE_URL}/api/rooms/`);
  return res.data;
};
