import React, { useContext } from "react";
import { UserContext } from "../context/Context";
import bg from "../asset/bg.png";
const ChannelBar = ({ url, name, id }) => {
  const { selectedRm, setSelectedRm } = useContext(UserContext);
  const handleClick = () => {
    setSelectedRm(id);
  };
  const BUCKET_PATH = process.env.REACT_APP_BUCKET_PATH;
  const selectedChannel = () => (
    <div
      className="h-[100px] border-gray-100 flex flex-row justify-start items-center border-b-2 bg-gray-200"
      onClick={handleClick}
    >
      <img
        className="rounded-full h-[60px] w-[60px] mx-5"
        style={{ border: "1px solid gray" }}
        src={url == "" ? bg : `${BUCKET_PATH}${url}`}
      />
      <h2>{name}</h2>
    </div>
  );
  const normalChannel = () => (
    <div
      className="h-[100px] border-gray-100 flex flex-row justify-start items-center border-b-2"
      onClick={handleClick}
    >
      <img
        className="rounded-full h-[60px] w-[60px] mx-5"
        style={{ border: "1px solid gray" }}
        src={url == "" ? bg : `${BUCKET_PATH}${url}`}
      />
      <h2>{name}</h2>
    </div>
  );
  return <>{selectedRm == id ? selectedChannel() : normalChannel()}</>;
};

export default ChannelBar;
