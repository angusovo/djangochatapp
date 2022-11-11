import "./chatInput.css";
import { client } from "../Socket";
import { useContext, useState } from "react";
import { saveMessage } from "../ApiHelper";
import { UserContext } from "../context/Context";
import upload from "../asset/uploadFile.png";
import { saveMediaMessage } from "../ApiHelper";
function ChatInput({ preview, setPreview }) {
  const [input, setInput] = useState("");
  const { selectedRm } = useContext(UserContext);
  const [file, setFile] = useState(null);
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const token = localStorage.getItem("token");
  const handleSubmit = (e) => {
    const body = {
      message: input,
      room: selectedRm,
      token: token,
    };
    e.preventDefault();
    client.send(JSON.stringify(body));
    saveMessage(body);
    setInput("");
  };

  let handleFile = (e) => {
    setFile(e.target.files[0]);
    if (e.target.files[0]) {
      const objectUrl = URL.createObjectURL(e.target.files[0]);
      setPreview(objectUrl);
    }
  };
  let handleFileSubmit = async (e) => {
    console.log("submit");
    const formData = new FormData();
    const message = "photo uploaded";
    formData.append("file", file);
    formData.append("message", message);
    formData.append("room", selectedRm);
    formData.append("token", token);
    e.preventDefault();

    const socketMsg = {
      message: message,
      room: selectedRm,
      token: token,
    };
    let resp = await saveMediaMessage(formData);
    if (resp) {
      client.send(JSON.stringify(socketMsg));
      setPreview(null);
    }
  };
  return (
    <div className="chatInput">
      <form onSubmit={preview ? handleFileSubmit : handleSubmit}>
        {preview ? (
          <div className="flex justify-evenly items-center gap-20">
            <div className="">
              <label for="file-input">
                <img src={upload} className="w-10 mr-2" />
              </label>

              <input
                id="file-input"
                type="file"
                onChange={handleFile}
                style={{ display: "none" }}
              />
            </div>
            <p>OR</p>
            <button className="sendButton" type="submit">
              Send
            </button>
          </div>
        ) : (
          <>
            <input
              className="inputBar"
              placeholder="Type here"
              onChange={handleChange}
              value={input}
            ></input>
            <div className="">
              <label for="file-input">
                <img src={upload} className="w-10 mr-2" />
              </label>

              <input
                id="file-input"
                type="file"
                onChange={handleFile}
                style={{ display: "none" }}
              />
            </div>
            <button className="sendButton" type="submit">
              Send
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default ChatInput;
