import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

import { socket } from "@/common/lib/socket";
import { useModal } from "@/common/recoil/modal";
import { useSetRoomId } from "@/common/recoil/room";

import NotFoundModal from "../modals/NotFound";

const Home = () => {
  const { openModal } = useModal();
  const setAtomRoomId = useSetRoomId();

  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const router = useRouter();

  
  useEffect(() => {
    document.body.style.background = "black";
  }, []);

  // socket listeners
  useEffect(() => {
    socket.on("created", (roomIdFromServer) => {
      setAtomRoomId(roomIdFromServer);
      router.push(roomIdFromServer);
    });

    const handleJoinedRoom = (roomIdFromServer: string, failed?: boolean) => {
      if (!failed) {
        setAtomRoomId(roomIdFromServer);
        router.push(roomIdFromServer);
      } else {
        openModal(<NotFoundModal id={roomId} />);
      }
    };

    socket.on("joined", handleJoinedRoom);

    return () => {
      socket.off("created");
      socket.off("joined", handleJoinedRoom);
    };
  }, [openModal, roomId, router, setAtomRoomId]);

  // leave room on load
  useEffect(() => {
    socket.emit("leave_room");
    setAtomRoomId("");
  }, [setAtomRoomId]);

  const handleCreateRoom = () => {
    if (!username.trim()) return;
    socket.emit("create_room", username);
  };

  const handleJoinRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (roomId && username) {
      socket.emit("join_room", roomId, username);
    }
  };

  return (
    <div className="page">

      
      <video autoPlay muted loop playsInline className="video-bg">
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      
      <div className="overlay" />

      
      <div className="glass-container">

        
        <h1 className="title">
          Illustration Café <span className="logo">☕</span>
        </h1>

        <p className="subtitle">Fresh ideas brewed live</p>

        
        <div className="input-group">
          <label>Enter your name</label>
          <input
            className="input"
            placeholder="Username..."
            value={username}
            onChange={(e) => setUsername(e.target.value.slice(0, 15))}
          />
        </div>

        {/* JOIN ROOM FORM */}
        <form onSubmit={handleJoinRoom}>

          <div className="input-group">
            <label>Enter room id</label>
            <input
              className="input"
              placeholder="Room id..."
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            />
          </div>

          <button className="btn-secondary" type="submit">
            Join Room
          </button>

        </form>

        {/* Divider */}
        <div style={{ margin: "15px 0", opacity: 0.5 }}>or</div>

        
        <button className="btn-primary" onClick={handleCreateRoom}>
          Create Room
        </button>

      </div>
    </div>
  );
};

export default Home;