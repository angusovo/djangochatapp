import ChatInput from "./chatInput";
import ChatMessage from "./chatMessage";
import "./chatroom.css";
import { getRmMessage, getAllRooms } from "../ApiHelper";
import { useRef, useEffect, useState, useContext } from "react";
import Channel from "./channel";
import { UserContext } from "../context/Context";
import RoomModal from "./Modal";
import { client } from "../Socket";
import { NotificationHandler } from "./NotificationHandler";
import { Navigate } from "react-router-dom";
function Chatroom() {
  const chatListRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isAuth, setIsAuth] = useState(true);
  useEffect(() => {
    const scroll =
      chatListRef.current.scrollHeight - chatListRef.current.clientHeight;
    chatListRef.current.scrollTo(0, scroll);
  }, [messages]);
  const { selectedRm, setSelectedRm } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      let rmMsg = await getRmMessage(selectedRm);
      setMessages(rmMsg);
      let rooms = await getAllRooms();
      setRooms(rooms);
    })();
  }, []);

  useEffect(() => {
    let token = localStorage.getItem("token");
    let expiredDateTime = localStorage.getItem("TokenExpiredDateTime");

    if (!token || !expiredDateTime) {
      setIsAuth(false);
      NotificationHandler("error", `Authentication Failed`, `Token Expired`);
    }

    if (new Date(expiredDateTime) < new Date()) {
      setIsAuth(false);
      NotificationHandler("error", `Authentication Failed`, `Token Expired`);
    }
  }, []);

  useEffect(() => {
    (async () => {
      let rmMsg = await getRmMessage(selectedRm);
      setMessages(rmMsg);
    })();
  }, [selectedRm]);

  const getSelectedRmName = () => {
    let rm = rooms?.filter((rm) => rm.id == selectedRm);
    return rm[0]?.name;
  };
  const getSelectedRmId = () => {
    let rm = rooms?.filter((rm) => rm.id == selectedRm);
    return rm[0]?.id;
  };

  const handleLogout = () => {
    client.close();
    client.onclose = () => {
      console.log("WebSocket Client Disconnected");
    };
    localStorage.clear();
    setIsAuth(false);
  };
  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  client.onmessage = async (message) => {
    console.log("on message from chatroom");
    const dataFromServer = JSON.parse(message.data);
    NotificationHandler(
      "info",
      ` ${dataFromServer.message}`,
      `${dataFromServer.room}# ${dataFromServer.sender}`
    );
    let rmMsg = await getRmMessage(selectedRm);
    setMessages(rmMsg);
  };

  const createRoomBtn = () => (
    <button className=" text-black" onClick={openModal}>
      Create New Chat Room
    </button>
  );
  return (
    <div className="flex items-center p-20 justify-center h-screen bg-[#242424]">
      <div className="w-[800px] h-[100%] bg-white border-r-[10px] flex flex-row">
        <RoomModal isModalOpen={isOpenModal} closeModal={closeModal} />
        <Channel rooms={rooms} selectedRm={selectedRm} bottom={createRoomBtn} />
        <div className="flex-[0.7] h-[100%] flex flex-col">
          <div className="chatroomHeader">
            <p>Chat Room # {getSelectedRmName()}</p>
            <p className="text-sm pr-1">ID:{getSelectedRmId()}</p>
          </div>
          <div className="chatroomList" ref={chatListRef}>
            {messages.length > 0 &&
              messages.map((msg, id) => (
                <ChatMessage
                  key={id}
                  id={id}
                  createAt={msg.createAt}
                  sender={msg.sender_dname}
                  message={msg.message}
                />
              ))}
          </div>
          <ChatInput />
        </div>
      </div>
      <div className="text-white absolute right-1 top-1" onClick={handleLogout}>
        LOGOUT{" "}
      </div>
      {!isAuth && <Navigate to="/" replace={true} />}
    </div>
  );
}

export default Chatroom;
