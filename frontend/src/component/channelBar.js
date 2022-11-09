import React, { useContext } from "react";
import { UserContext } from "../context/Context";

const ChannelBar = ({ name, id }) => {
  const { selectedRm, setSelectedRm } = useContext(UserContext);
  const handleClick = () => {
    setSelectedRm(id);
  };

  const selectedChannel = () => (
    <div
      className="h-[100px] border-gray-100 flex flex-row justify-start items-center border-b-2 bg-gray-200"
      onClick={handleClick}
    >
      <img
        className="rounded-full h-[60px] w-[60px] mx-5"
        style={{ border: "1px solid gray" }}
        src="https://cdn.vox-cdn.com/thumbor/PQWb8TBPiMojcn2TjBrJyIEkDks=/0x0:1300x867/1200x0/filters:focal(0x0:1300x867):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/5934509/shutterstock_325025231.0.jpg"
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
        src="https://cdn.vox-cdn.com/thumbor/PQWb8TBPiMojcn2TjBrJyIEkDks=/0x0:1300x867/1200x0/filters:focal(0x0:1300x867):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/5934509/shutterstock_325025231.0.jpg"
      />
      <h2>{name}</h2>
    </div>
  );
  return <>{selectedRm == id ? selectedChannel() : normalChannel()}</>;
};

export default ChannelBar;
