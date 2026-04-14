import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

import { useModal } from "@/common/recoil/modal";
import { useRoom } from "@/common/recoil/room";

const ShareModal = () => {
  const { id } = useRoom();
  const { closeModal } = useModal();

  const [url, setUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div className="relative flex flex-col items-center rounded-md bg-white p-10 pt-5">
      
      
      <button onClick={closeModal} className="absolute top-5 right-5 text-black">
        <AiOutlineClose />
      </button>

      
      <h2 className="text-2xl font-bold text-black">Invite</h2>

      
      <h3 className="text-black mt-2">
        Room id:{" "}
        <span className="inline font-bold">{id}</span>
      </h3>

      
      <div className="relative mt-4 w-full">
        
        
        <input
          type="text"
          value={url}
          readOnly
          className="w-full sm:w-96 px-4 py-2 rounded-lg border border-zinc-300 bg-white text-black outline-none"
        />

        
        <button
          className="absolute right-1 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-black text-white rounded-md hover:bg-zinc-800 transition"
          onClick={handleCopy}
        >
          Copy
        </button>

      </div>
    </div>
  );
};

export default ShareModal;