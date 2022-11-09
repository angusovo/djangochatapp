import "./App.css";
import Header from "./component/header";
import Chatroom from "./component/chatroom";
import LoginCard from "./component/loginCard";
import {
  useState,
  useEffect,
  useCallback,
  useContext,
  createContext,
} from "react";
import { client } from "./Socket";
import { getAllChannels } from "./ApiHelper";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignupCard from "./component/signupCard";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import history from "./history";
import { UserContext } from "./context/Context";

function App() {
  const [room, setRoom] = useState({
    messages: [],
  });

  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [globalUser, setGlobalUser] = useState(null);
  const [selectedRm, setSelectedRm] = useState(1);
  const value = { globalUser, setGlobalUser, selectedRm, setSelectedRm };
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

  return (
    <HistoryRouter history={history}>
      <UserContext.Provider value={value}>
        <Routes>
          <Route exact path="/" element={<LoginCard />} />
          <Route path="signup" exact element={<SignupCard />} />
          <Route path="dashboard" exact element={<Chatroom />} />
        </Routes>
      </UserContext.Provider>
    </HistoryRouter>
  );
}

export default App;
