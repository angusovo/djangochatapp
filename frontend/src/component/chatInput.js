import "./chatInput.css";
import { client } from "../Socket";
import { useState } from "react";
import axios from "axios";
function ChatInput() {
  const [input, setInput] = useState("");

  const username = localStorage.getItem("uname");
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = (e) => {
    const data = {
      message: input,
      sender: username,
    };
    e.preventDefault();
    client.send(JSON.stringify(data));
    axios.post("http://localhost:8000/api/message/", { data }).then((res) => {
      console.log("res", res);
    });
  };
  return (
    <div className="chatInput">
      <form onSubmit={handleSubmit}>
        <input
          className="inputBar"
          placeholder="Type here"
          onChange={handleChange}
        ></input>
        <button className="sendButton" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
