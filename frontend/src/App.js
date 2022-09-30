import logo from "./logo.svg";
import "./App.css";
import Header from "./component/header";
import Chatroom from "./component/chatroom";
import LoginCard from "./component/loginCard";
import { useState, useEffect } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

function App() {
  const [room, setRoom] = useState({
    messages: [],
    value: "",
    name: "",
    room: "test",
  });
  const [isLoggedIn, setisLoggedIn] = useState(false);

  let client = new W3CWebSocket("ws://127.0.0.1:8000/ws/001/");

  useEffect(() => {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      if (dataFromServer) {
        setRoom((state) => ({
          messages: [
            ...state.messages,
            {
              msg: dataFromServer.text,
              name: dataFromServer.sender,
            },
          ],
        }));
      }
    };
    return () => {};
  }, []);

  return (
    <div className="App">
      <Header />

      {isLoggedIn ? <Chatroom /> : <LoginCard />}
    </div>
  );
}

export default App;
