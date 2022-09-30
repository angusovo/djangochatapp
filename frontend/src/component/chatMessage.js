import "./chatMessage.css";
import Avtar from "../asset/avtar.png";
function ChatMessage(props) {
  return (
    <div className="message">
      <div className="avtar">
        {/* <p>{props.dname}</p> */}
        <p>AY</p>
      </div>
      <div className="content">
        <div className="contentSender">
          <p>Angus Yip</p>
        </div>
        <div className="messageContent">
          <p>hello from the other side</p>
        </div>
        <div className="messageTime">
          <p>2022-7-1</p>
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;
