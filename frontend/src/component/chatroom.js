import ChatInput from "./chatInput";
import ChatMessage from "./chatMessage";
import "./chatroom.css";

function Chatroom() {
  return (
    <div className="chatroom">
      <div className="chatroomContainer">
        <div className="chatroomHeader">Chat Room #</div>
        <div className="chatroomList">
          <ChatMessage />
          <ChatMessage id={2} />
          <ChatMessage />
          <ChatMessage id={2} />
          <ChatMessage />
          <ChatMessage id={2} />
          <ChatMessage />
          <ChatMessage id={2} />
        </div>
        <ChatInput />
      </div>
    </div>
  );
}

export default Chatroom;
