import React, { useState } from "react";
import { Send, Paperclip } from "lucide-react";
import axios from "axios";

const SendBar = ({ id, sid, socket }) => {
  const token = localStorage.getItem("Token");
  const [sendMessage, setSendMessage] = useState("");

  const SendMsg = () => {
    if (sendMessage.trim() === "" || !id._id) return;
    axios
      .post(
        `https://node-js-view-point.onrender.com/api/messages/sendmessage/${id._id}`,
        { message: sendMessage },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status === 201) {
          setSendMessage("");
        }
      })
      .catch((error) => console.error("Error sending message:", error));

    if (socket) {
      socket.emit("sendMessage", {
        message: sendMessage,
        participients: [sid, id._id],
      });
    }
  };

  return (
    <div className="w-full inset-0 bg-black/30 opacity-100  p-2 flex items-center gap-1 md:gap-2">
      <input
        type="text"
        placeholder="Type a message"
        value={sendMessage}
        onChange={(e) => setSendMessage(e.target.value)}
        className="flex-1 px-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-indigo-50"
      />
      <button
        className="p-2 rounded-full bg-gray-200 transition hover:bg-gray-50"
        onClick={() => console.log("Attach File")}
      >
        <Paperclip size={24} className="text-gray-500 " />
      </button>
      <button
        onClick={SendMsg}
        className="p-2  rounded-full bg-blue-600 hover:bg-blue-700 transition text-white"
      >
        <Send size={24} weight="fill" />
      </button>
    </div>
  );
};

export default SendBar;
