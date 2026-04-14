import { useState } from "react";
import { socket } from "@/common/lib/socket";
import { useRoom } from "@/common/recoil/room";

import RoomContextProvider from "../context/Room.context";
import Canvas from "./board/Canvas";
import MousePosition from "./board/MousePosition";
import MousesRenderer from "./board/MousesRenderer";
import MoveImage from "./board/MoveImage";
import SelectionBtns from "./board/SelectionBtns";
import Chat from "./chat/Chat";
import NameInput from "./NameInput";
import ToolBar from "./toolbar/ToolBar";
import UserList from "./UserList";

const Room = () => {
  const room = useRoom();


  const [showRoomBar, setShowRoomBar] = useState(true);

  if (!room.id) return <NameInput />;

  return (
    <RoomContextProvider>
      <div className="relative h-full w-full overflow-hidden">


        {showRoomBar && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-2 rounded-lg bg-black/60 backdrop-blur-md text-white">

            <span className="font-semibold tracking-widest">
              {room.id}
            </span>


            <button
              onClick={() => setShowRoomBar(false)}
              className="text-white hover:text-red-400 transition"
            >
              ✕
            </button>
          </div>
        )}

        <UserList />
        <ToolBar />
        <SelectionBtns />
        <MoveImage />
        <Canvas />
        <MousePosition />
        <MousesRenderer />
        <Chat />

      </div>
    </RoomContextProvider>
  );
};

export default Room;