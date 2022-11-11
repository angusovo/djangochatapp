import "./chatMessage.css";
import moment from "moment";
function ChatMessage({
  id,
  sender,
  message,
  createAt,
  url,
  file_path,
  content_type,
}) {
  let shortName = sender
    .split(/\s/)
    .reduce((accumulator, word) => accumulator + word.charAt(0), "");
  let bucket_name = process.env.REACT_APP_BUCKET_PATH;
  let timestamp = moment(createAt).format("YYYY-MM-DD h:mm:ss a");
  if (id % 2 === 0) {
    return (
      <div className="message">
        {url == "" ? (
          <div className="avtar">
            <p>{shortName}</p>
          </div>
        ) : (
          <img
            className="rounded-full w-[70px] h-[70px]"
            src={`${bucket_name}${url}`}
          />
        )}

        <div className="content">
          <div className="contentSender">
            <p>{sender}</p>
          </div>
          <div className="messageContent">
            {content_type == "image" && file_path != "" ? (
              <img src={`${bucket_name}${file_path}`} />
            ) : (
              <p>{message}</p>
            )}
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
        {url == "" ? (
          <div className="avtar">
            <p>{shortName}</p>
          </div>
        ) : (
          <img
            className="rounded-full w-[70px] h-[70px]"
            src={`${bucket_name}${url}`}
          />
        )}
        <div className="content_alt">
          <div className="contentSender">
            <p>{sender}</p>
          </div>
          <div className="messageContent">
            {content_type == "image" && file_path != "" ? (
              <img src={`${bucket_name}${file_path}`} />
            ) : (
              <p>{message}</p>
            )}{" "}
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
