import { socket } from "@/common/lib/socket";

type Props = {
  userId: string;
  msg: string;
  username: string;
  color?: string;
};

const Message = ({ userId, msg, username, color }: Props) => {
  const me = socket.id === userId;

  return (
    <div
      className={`my-2 flex flex-col ${
        me ? "items-end text-right" : "items-start text-left"
      }`}
    >
      {/* username */}
      <span
        style={{ color: me ? "#aaa" : color || "#60a5fa" }}
        className="text-xs font-semibold"
      >
        {me ? "You" : username}
      </span>

      {/* message bubble */}
      <div
        className={`px-3 py-2 rounded-xl max-w-[70%] ${
          me
            ? "bg-white/20 text-black"
            : "bg-white/10 text-black"
        }`}
        style={{ wordBreak: "break-word" }}
      >
        {msg}
      </div>
    </div>
  );
};

export default Message;