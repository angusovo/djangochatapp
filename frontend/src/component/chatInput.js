import "./chatInput.css";
import { client } from "../Socket";
import { useContext, useState } from "react";
import { saveMessage } from "../ApiHelper";
import { UserContext } from "../context/Context";
function ChatInput() {
  const [input, setInput] = useState("");
  const { selectedRm } = useContext(UserContext);

  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = (e) => {
    const body = {
      message: input,
      room: selectedRm,
      token: localStorage.getItem("token"),
    };
    e.preventDefault();
    client.send(JSON.stringify(body));
    saveMessage(body);
    setInput("");
  };
  return (
    <div className="chatInput">
      <form onSubmit={handleSubmit}>
        <input
          className="inputBar"
          placeholder="Type here"
          onChange={handleChange}
          value={input}
        ></input>
        <button className="sendButton" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
