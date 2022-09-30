import ChatMessage from "./chatMessage";
import "./chatroom.css";

function Chatroom() {
  return (
    <div className="chatroom">
      <div className="chatroomContainer">
        <div className="chatroomHeader">Chat Room #</div>
        <ChatMessage />
      </div>
    </div>
  );
}

export default Chatroom;
