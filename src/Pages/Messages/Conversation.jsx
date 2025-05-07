import { useEffect, useRef, useState } from "react";
import axios from "axios";
import SendBar from "./SendBar";
import useSocket from "../../Components/useSocket";
import { ArrowLeft, Phone, Video, MoreVertical } from "lucide-react";
import { useSelector } from "react-redux";

const Conversation = ({ suid, setUsertoChat }) => {
  const [chatUser, setChatUser] = useState("");
  const [messages, setMessages] = useState([]);
  const token = localStorage.getItem("Token");
  const username = localStorage.getItem("username");
  const [open, setOpen] = useState(false);
  const [rid, setRid] = useState(null);
  const [sid, setSid] = useState(null);
  const { users } = useSelector((state) => state.meme);

  const chatContainerRef = useRef(null);
  //base url
  const BaseUrl = import.meta.env.VITE_BASE_URL;

  //socket connection
  const socket = useSocket(`${BaseUrl}`);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    handleSelectedUser(suid);
  }, [suid]);

  //current_user
  const currentUser = users.find((user) => user.username === username);

  useEffect(() => {
    if (currentUser) setSid(currentUser._id);
  }, [users, username]);

  //get all msg of selected users
  const handleSelectedUser = (id) => {
    setRid(id);
    setChatUser(users.find((user) => user._id === id));

    axios
      .get(`${BaseUrl}api/messages/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => setMessages(response.data))
      .catch((error) => console.error("Error fetching messages:", error));
  };

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (data) => {
      const { message, participients } = data;
      if (participients.includes(rid)) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };

    socket.on("sendMessage", handleNewMessage);
    return () => socket.off("sendMessage", handleNewMessage);
  }, [socket, rid]);

  return (
    <div className="col-span-8 text-center overflow-y-hidden px-0">
      <div className="md:h-screen h-[calc(100vh-40px)] w-full p-1 sm:p-5 md:p-0 lg:p-0 m-0 ">
        <div
          className="flex flex-col h-full w-full bg-cover bg-center bg-no-repeat bg-[#ebf2f3]"
          // style={{ backgroundImage: "url('/chatbg.jpg')" }}
        >
          {/* Header */}
          <div className="bg-[#ebd0f8] p-2 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <button
                className="cursor-pointer"
                onClick={() => setUsertoChat(null)}
              >
                <ArrowLeft />
              </button>
              <img
                src={chatUser?.profile}
                className="w-8 h-8 rounded-full"
                alt="avatar"
              />
              <span className="font-bold text-sm md:text-base">
                {chatUser?.fullname}
              </span>
            </div>
            <div className="flex items-center gap-5">
              <Phone className="text-blue-500" />
              <Video className="text-purple-500" />
              <button onClick={() => setOpen(!open)}>
                <MoreVertical />
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="border-b border-gray-400"></div>

          {/* Messages + Input */}
          <div className="flex flex-col flex-grow overflow-hidden">
            {/* Message area */}
            <div
              className="flex-grow overflow-y-auto p-2 no-scrollbar"
              ref={chatContainerRef}
            >
              {messages.length > 0 ? (
                messages.map((data, i) => (
                  <div
                    key={i}
                    className={`mb-3 ${
                      data.senderId !== chatUser._id
                        ? "flex justify-end"
                        : "flex justify-start"
                    }`}
                  >
                    <div
                      className={`${
                        data.senderId !== chatUser._id
                          ? "bg-green-100 border border-green-300 rounded-tl-lg rounded-tr-lg rounded-bl-lg shadow-sm"
                          : "bg-indigo-100 border border-indigo-300 rounded-tr-lg rounded-tl-lg rounded-br-lg shadow-sm"
                      } px-3 py-1 max-w-[75%] break-words`}
                    >
                      <div>{data.message}</div>
                      <div className="text-xs text-gray-500 text-right select-none">
                        {new Date(data.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex justify-center items-center h-full">
                  No messages yet
                </div>
              )}
            </div>

            {/* SendBar */}
            <div className="p-0">
              <SendBar id={chatUser} sid={sid} socket={socket} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
