import "./chatMessage.css";
import Avtar from "../asset/avtar.png";
import moment from "moment";
function ChatMessage({ id, sender, message, createAt }) {
  let shortName = sender
    .split(/\s/)
    .reduce((accumulator, word) => accumulator + word.charAt(0), "");

  let timestamp = moment(createAt).format("YYYY-MM-DD h:mm:ss a");
  if (id % 2 == 0) {
    return (
      <div className="message">
        <div className="avtar">
          <p>{shortName}</p>
        </div>
        <div className="content">
          <div className="contentSender">
            <p>{sender}</p>
          </div>
          <div className="messageContent">
            <p>{message}</p>
          </div>
          <div className="messageTime">
            <p>{timestamp}</p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="message_alt">
        <div className="avtar">
          <p>{shortName}</p>
        </div>
        <div className="content_alt">
          <div className="contentSender">
            <p>{sender}</p>
          </div>
          <div className="messageContent">
            <p>{message}</p>
          </div>
          <div className="messageTime">
            <p>{timestamp}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatMessage;
