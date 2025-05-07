import React, { useEffect, useState } from "react";
import { AllUsers } from "../../Components/AllUsers";
import { useSelector, useDispatch } from "react-redux";
import Conversation from "./Conversation";
import useSocket from "../../Components/useSocket";
import { incrementUnread } from "../../Store/memeSlice";

const Inbox = () => {
  const { users } = useSelector((state) => state.meme);
  const username = localStorage.getItem("username");
  const currentUser = users.find((user) => user.username === username);
  const [userToChat, setUsertoChat] = useState(null);
  const BaseUrl = import.meta.env.VITE_BASE_URL;
  const socket = useSocket(`${BaseUrl}`);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket || !currentUser) return;

    const handleNewMessage = ({ participients }) => {
      const sid = currentUser._id;
      const rid = userToChat; // this will be null if no chat is open

      if (participients.includes(rid)) {
        // chat already open, Conversation will handle this
        return;
      } else if (participients.includes(sid)) {
        const otherUserId = participients.find((id) => id !== sid);
        dispatch(incrementUnread(otherUserId));
        playNotificationSound();
      }
    };

    socket.on("sendMessage", handleNewMessage);
    return () => socket.off("sendMessage", handleNewMessage);
  }, [socket, currentUser, userToChat]);

  const handleBack = () => {
    setUsertoChat(null);
  };
  const playNotificationSound = () => {
    const audio = new Audio("/sound/adu1.mp3");
    audio.play();
  };
  return (
    <div className="w-full h-screen overflow-hidden">
      {/* Desktop layout */}
      <div className="hidden md:grid grid-cols-12 h-full">
        <div className="col-span-4">
          <AllUsers
            currentUser={[currentUser]}
            users={users}
            username={username}
            setUsertoChat={setUsertoChat}
          />
        </div>

        <div className="relative h-full col-span-8">
          {userToChat ? (
            <Conversation
              suid={userToChat}
              setUsertoChat={setUsertoChat}
              socket={socket}
            />
          ) : (
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: "url('/chatbg.jpg')" }}
            ></div>
          )}
        </div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden h-full">
        {!userToChat ? (
          <AllUsers
            currentUser={[currentUser]}
            users={users}
            username={username}
            setUsertoChat={setUsertoChat}
          />
        ) : (
          <Conversation
            suid={userToChat}
            setUsertoChat={handleBack}
            socket={socket}
          />
        )}
      </div>
    </div>
  );
};

export default Inbox;
