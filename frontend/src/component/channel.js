import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/Context";
import { getAllRooms } from "../ApiHelper";
import ChannelBar from "./channelBar";

const Channel = ({ rooms, selectedRm }) => {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="flex-[0.4] border-r-2">
      <div className="h-[57px] text-center text-gray-500 flex align-center pl-[15px] justify-center border-b-2 p-2">
        <input
          className="w-[100%] bg-gray-200 rounded p-2"
          placeholder="Search Chats Here"
          onChange={handleChange}
        />
      </div>
      <div className="h-[90%] overflow-auto">
        {rooms.length > 0
          ? rooms
              .filter((room) => room.name.includes(search))
              .map((room, key) => (
                <ChannelBar key={key} name={room.name} id={room.id} />
              ))
          : null}
      </div>
    </div>
  );
};

export default Channel;
