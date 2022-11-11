import axios from "axios";
import moment from "moment";
import { createBrowserHistory } from "history";
import { NotificationHandler } from "./component/NotificationHandler";

const BASE_URL = "http://localhost:8000";

const saveTokens = (data) => {
  localStorage.setItem("token", data);
  const expiredDateTime = moment().add(15000, "seconds");
  localStorage.setItem("TokenExpiredDateTime", expiredDateTime.toString());
};

export const login = async (body) => {
  try {
    let headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    let resp = await axios({
      method: "post",
      url: `${BASE_URL}/api/auth/`,
      data: body,
      headers: headers,
    });
    if (resp.status == 200) {
      saveTokens(resp.data.token);
      NotificationHandler("success", "", "Login Successfully");
      return resp;
    }
  } catch (err) {
    NotificationHandler("error", err.response.data.message, "Error in loggin ");
  }
};

export const logout = (body) => {
  axios.post(`${BASE_URL}/api/auth/`, { body }).then((res) => {});
};

export const createUser = async (body) => {
  try {
    let headers = { "Content-Type": "multipart/form-data" };
    let resp = await axios({
      method: "post",
      url: `${BASE_URL}/api/user/`,
      data: body,
      headers: headers,
    });
    if (resp.status == 200) {
      saveTokens(resp.data.token);
      NotificationHandler("success", "Welcome!", "Created User Successfully");
      return resp;
    }
  } catch (err) {
    NotificationHandler(
      "error",
      err.response.data.message,
      "Error in creating user"
    );
  }
};

export const saveMessage = (body) => {
  try {
    axios.post(`${BASE_URL}/api/message/`, { body }).then((res) => {});
  } catch (err) {
    NotificationHandler(
      "error",
      err.response.data.message,
      "Error in sending messages"
    );
  }
};

export const getRmMessage = async (id) => {
  try {
    let res = await axios.get(`${BASE_URL}/api/message/?id=${id}`);
    return res.data;
  } catch (err) {
    NotificationHandler(
      "error",
      err.response.data.message,
      "Error in fetching messages"
    );
  }
};

export const getAllRooms = async () => {
  try {
    let res = await axios.get(`${BASE_URL}/api/rooms/`);
    return res.data;
  } catch (err) {
    NotificationHandler(
      "error",
      err.response.data.message,
      "Error in fetching room"
    );
  }
};

export const createNewRooms = async (body) => {
  try {
    let headers = { "Content-Type": "multipart/form-data" };
    let resp = await axios({
      method: "post",
      url: `${BASE_URL}/api/rooms/`,
      data: body,
      headers: headers,
    });
    if (resp.status == 200) {
      return resp;
    }
  } catch (err) {
    NotificationHandler(
      "error",
      err.response.data.message,
      "Error in creating room"
    );
  }
};

export const saveMediaMessage = async (body) => {
  try {
    let headers = { "Content-Type": "multipart/form-data" };
    let resp = await axios({
      method: "post",
      url: `${BASE_URL}/api/mediamsg/`,
      data: body,
      headers: headers,
    });
    if (resp.status == 200) {
      return resp;
    }
  } catch (err) {
    NotificationHandler(
      "error",
      err.response.data.message,
      "Error in creating user"
    );
  }
};
