import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import SendBar from "./SendBar";
import { ArrowLeft, Phone, Video, MoreVertical } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { resetUnread, setUserToChatR } from "../../Store/memeSlice";

const Conversation = ({ suid, setUsertoChat, socket }) => {
  const [chatUser, setChatUser] = useState("");
  const [messages, setMessages] = useState([]);
  const token = localStorage.getItem("Token");
  const username = localStorage.getItem("username");
  const [open, setOpen] = useState(false);
  const [rid, setRid] = useState(null);
  const [sid, setSid] = useState(null);
  const chatContainerRef = useRef(null);

  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.meme);
  const BaseUrl = import.meta.env.VITE_BASE_URL;

  const currentUser = users.find((user) => user.username === username);

  useEffect(() => {
    if (currentUser) setSid(currentUser._id);
  }, [users, username]);

  useEffect(() => {
    if (suid) {
      handleSelectedUser(suid);
      dispatch(resetUnread(suid)); // reset badge when chat opens
    }
  }, [suid]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSelectedUser = (id) => {
    setRid(id);
    const foundUser = users.find((user) => user._id === id);
    setChatUser(foundUser || {});

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
    if (!socket || !rid || !sid) return;

    const handleNewMessage = (data) => {
      const { message, participients } = data;

      if (participients.includes(rid)) {
        // message belongs to currently open chat
        setMessages((prev) => [...prev, message]);
      }
    };

    socket.on("sendMessage", handleNewMessage);
    return () => socket.off("sendMessage", handleNewMessage);
  }, [socket, rid, sid]);

  return (
    <div className="col-span-8 text-center overflow-y-hidden px-0">
      <div className="h-[calc(100vh-100px)]  md:h-screen w-full overflow-y-hidden p-1 sm:p-5 md:p-0 lg:p-0 md:mb-0 mb-">
        <div className="flex flex-col h-full w-full bg-cover bg-center bg-no-repeat bg-[#ebf2f3]">
          <div className="bg-[#ebd0f8] p-2 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <button
                className="cursor-pointer"
                onClick={() => {
                  setUsertoChat(null);
                  dispatch(setUserToChatR(""));
                }}
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

          <div className="border-b border-gray-400"></div>

          {/* { Messages } */}
          <div className="flex flex-col flex-grow overflow-hidden">
            <div
              className="flex-grow overflow-y-auto p-2 no-scrollbar"
              ref={chatContainerRef}
            >
              {messages.length > 0 ? (
                messages.map((data, i) => {
                  const currentDate = new Date(data.createdAt);
                  const prevDate =
                    i > 0 ? new Date(messages[i - 1].createdAt) : null;

                  const isNewDay =
                    !prevDate ||
                    currentDate.toDateString() !== prevDate.toDateString();

                  const getDisplayDate = (date) => {
                    const today = new Date();
                    const yesterday = new Date();
                    yesterday.setDate(today.getDate() - 1);

                    if (date.toDateString() === today.toDateString())
                      return "Today";
                    if (date.toDateString() === yesterday.toDateString())
                      return "Yesterday";
                    return date.toLocaleDateString(undefined, {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    });
                  };

                  return (
                    <React.Fragment key={i}>
                      {isNewDay && (
                        <div className="flex justify-center my-4">
                          <span className="text-[10px] text-gray-500 bg-white px-3 py-1 border border-gray-200 rounded-full shadow-sm select-none">
                            {getDisplayDate(currentDate)}
                          </span>
                        </div>
                      )}

                      <div
                        className={`mb-3 ${
                          data.senderId !== chatUser._id
                            ? "flex justify-end"
                            : "flex justify-start"
                        }`}
                      >
                        <div
                          className={`${
                            data.senderId !== chatUser._id
                              ? "bg-green-100 border border-green-300 text-justify rounded-tl-lg rounded-tr-lg rounded-bl-lg shadow-sm"
                              : "bg-indigo-100 border border-indigo-300 text-justify rounded-tr-lg rounded-tl-lg rounded-br-lg shadow-sm"
                          } px-3 py-1 max-w-[75%] break-words`}
                        >
                          <div>{data.message}</div>
                          <div className="text-[9px] text-gray-500 text-right select-none">
                            {currentDate.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })
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
