import ChatInput from "./chatInput";
import ChatMessage from "./chatMessage";
import "./chatroom.css";
import { getRmMessage, getAllRooms } from "../ApiHelper";
import { useRef, useEffect, useState, useContext } from "react";
import Channel from "./channel";
import { UserContext } from "../context/Context";
import ReactDOM from "react-dom";
import Modal from "react-modal";

function Chatroom() {
  const chatListRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

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

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "50%",
      height: "50%",
    },
  };

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  let subtitle;
  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }
  return (
    <div className="flex items-center p-20 justify-center h-screen bg-[#242424]">
      <div className="w-[800px] h-[100%] bg-white border-r-[10px] flex flex-row">
        <Modal
          isOpen={isOpenModal}
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="addNewRmModal"
          ariaHideApp={false}
        >
          <h2>hello</h2>
          <input type={"text"} />
        </Modal>
        <Channel rooms={rooms} selectedRm={selectedRm} />
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
      <button
        className="absolute bottom-10 left-[30%] text-white"
        onClick={openModal}
      >
        Create New Chat Room
      </button>
    </div>
  );
}

export default Chatroom;
