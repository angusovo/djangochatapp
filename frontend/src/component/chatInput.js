import "./chatInput.css";

function ChatInput() {
  return (
    <div className="chatInput">
      <input className="inputBar" placeholder="Type here"></input>
      <button className="sendButton">Send</button>
    </div>
  );
}

export default ChatInput;
