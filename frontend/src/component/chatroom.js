import ChatInput from "./chatInput";
import ChatMessage from "./chatMessage";
import "./chatroom.css";

import { useRef, useEffect } from "react";
function Chatroom({ messages }) {
  const chatListRef = useRef(null);

  useEffect(() => {
    const scroll =
      chatListRef.current.scrollHeight - chatListRef.current.clientHeight;
    chatListRef.current.scrollTo(0, scroll);
  }, [messages]);
  const renderChatMsg = messages.map((msg, id) => (
    <ChatMessage
      key={id}
      id={id}
      createAt={msg.createAt}
      sender={msg.sender}
      message={msg.message}
    />
  ));
  return (
    <div className="chatroom">
      <div className="chatroomContainer">
        <div className="chatroomHeader">Chat Room #</div>
        <div className="chatroomList" ref={chatListRef}>
          {renderChatMsg}
        </div>
        <ChatInput />
      </div>
    </div>
  );
}

export default Chatroom;
