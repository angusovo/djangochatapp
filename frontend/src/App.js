import logo from "./logo.svg";
import "./App.css";
import Header from "./component/header";
import Chatroom from "./component/chatroom";
import LoginCard from "./component/loginCard";
import { useState, useEffect } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { client } from "./Socket";
function App() {
  const [room, setRoom] = useState({
    messages: [],
  });
  const [isLoggedIn, setisLoggedIn] = useState(true);

  useEffect(() => {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message) => {
      console.log("on message", message.data);
      const dataFromServer = JSON.parse(message.data);
      if (dataFromServer) {
        console.log("have data");
        setRoom((state) => ({
          messages: [
            ...state.messages,
            {
              msg: dataFromServer.message,
              name: dataFromServer.sender,
            },
          ],
          name: dataFromServer.message,
        }));
      }
    };
    return () => {};
  }, [room]);

  return (
    <div className="App">
      <Header />
      {console.log(room)}
      {isLoggedIn ? <Chatroom /> : <LoginCard />}
    </div>
  );
}

export default App;
