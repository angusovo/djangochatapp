import axios from "axios";

const BASE_URL = "https://django-react-chat-app.herokuapp.com";

export const saveMessage = (body) => {
  axios.post(`${BASE_URL}/api/message/`, { body }).then((res) => {});
};

export const getAllMessage = async () => {
  let res = await axios.get(`${BASE_URL}/api/message/`);
  return res.data;
};
