import React from "react";
import { getRmMessage, getAllRooms } from "../ApiHelper";
import { useRef, useEffect, useState, useContext } from "react";
import Modal from "react-modal";
import { createNewRooms } from "../ApiHelper";
import { NotificationHandler } from "./NotificationHandler";
const RoomModal = ({ isModalOpen, closeModal }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "50%",
      minHeight: "600px",
    },
  };

  const [chatroomName, setChatroomName] = useState("");

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const handleChange = (e) => {
    setChatroomName(e.target.value);
  };

  let handleFile = (e) => {
    setFile(e.target.files[0]);
    const objectUrl = URL.createObjectURL(e.target.files[0]);
    setPreview(objectUrl);
  };
  let handleSubmit = async (e) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("rmName", chatroomName);
    e.preventDefault();
    let resp = await createNewRooms(formData);
    if (resp.status == 200) {
      NotificationHandler("success", resp.data.message);
      closeModal();
    } else {
      closeModal();
      NotificationHandler("error", resp.message);
    }
  };
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="addNewRmModal"
      ariaHideApp={false}
    >
      <div className="flex flex-col gap-5 items-center justify-center">
        <h2 className="text-center border-b-2 pb-5 uppercase">
          Create a new chat room
        </h2>
        <label className="text-left w-[100%]"> Channel Name </label>
        <input
          className="border-b-2 bg-gray-100 h-10 p-2 w-[100%]"
          type={"text"}
          onChange={handleChange}
          required
        />
        <label className="text-left w-[100%]"> Channel thumbnail </label>
        {file && (
          <img className="rounded-full h-[200px] w-[200px]" src={preview} />
        )}
        <input type={"file"} onChange={handleFile} required />
        <button className="mt-5 absolute bottom-5" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </Modal>
  );
};

export default RoomModal;
