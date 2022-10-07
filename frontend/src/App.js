import "./App.css";
import Header from "./component/header";
import Chatroom from "./component/chatroom";
import LoginCard from "./component/loginCard";
import { useState, useEffect, useCallback } from "react";
import { client } from "./Socket";
import { getAllMessage } from "./ApiHelper";
function App() {
  const [room, setRoom] = useState({
    messages: [],
  });
  const [isLoggedIn, setisLoggedIn] = useState(false);

  useEffect(() => {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message) => {
      console.log("on message", message.data);
      const dataFromServer = JSON.parse(message.data);
      if (dataFromServer) {
        setRoom((state) => ({
          messages: [
            ...state.messages,
            {
              message: dataFromServer.message,
              sender: dataFromServer.sender,
            },
          ],
          name: dataFromServer.message,
        }));
      }
    };
    return () => {};
  }, [room]);

  const fetchMessage = useCallback(async () => {
    let data = await getAllMessage();
    setRoom((state) => ({
      messages: data,
    }));
  }, []);

  useEffect(() => {
    fetchMessage();
    let uname = localStorage.getItem("uname");
    if (uname) {
      setisLoggedIn(true);
    }
  }, []);

  return (
    <div className="App">
      <Header />
      {isLoggedIn ? <Chatroom messages={room.messages} /> : <LoginCard />}
    </div>
  );
}

export default App;
