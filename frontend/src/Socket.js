import { w3cwebsocket as W3CWebSocket } from "websocket";
let ws = window.location.protocol === "https:" ? "wss" : "ws";

export const client = new W3CWebSocket(
  `${ws}://django-react-chat-app.herokuapp.com/ws/chat/1`
);
