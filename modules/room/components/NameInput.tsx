import { FormEvent, useEffect, useState } from "react";

import { useRouter } from "next/router";

import { socket } from "@/common/lib/socket";
import { useModal } from "@/common/recoil/modal";
import { useSetRoomId } from "@/common/recoil/room";
import NotFoundModal from "@/modules/home/modals/NotFound";

const NameInput = () => {
  const setRoomId = useSetRoomId();
  const { openModal } = useModal();

  const [name, setName] = useState("");

  const router = useRouter();
  const roomId = (router.query.roomId || "").toString();

  useEffect(() => {
    if (!roomId) return;

    socket.emit("check_room", roomId);

    socket.on("room_exists", (exists) => {
      if (!exists) {
        router.push("/");
      }
    });

    // eslint-disable-next-line consistent-return
    return () => {
      socket.off("room_exists");
    };
  }, [roomId, router]);

  useEffect(() => {
    const handleJoined = (roomIdFromServer: string, failed?: boolean) => {
      if (failed) {
        router.push("/");
        openModal(<NotFoundModal id={roomIdFromServer} />);
      } else setRoomId(roomIdFromServer);
    };

    socket.on("joined", handleJoined);

    return () => {
      socket.off("joined", handleJoined);
    };
  }, [openModal, router, setRoomId]);

  const handleJoinRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    socket.emit("join_room", roomId, name);
  };

  return (
    <div className="page relative h-screen w-full overflow-hidden">
  
      
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>
  
      
      <div className="overlay absolute inset-0 bg-black/30 z-10" />
  
      
      <form
        className="glass-container relative z-20"
        onSubmit={handleJoinRoom}
      >
  
        <h1 className="title">
          Illustration Café <span className="logo">☕</span>
        </h1>
  
        <p className="subtitle">Fresh ideas brewed live</p>
  
        <div className="input-group">
          <label>Enter your name</label>
          <input
            className="input"
            placeholder="Username..."
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, 15))}
          />
        </div>
  
        <button className="btn-primary" type="submit">
          Enter Room
        </button>
  
      </form>
    </div>
  );
};

export default NameInput;
