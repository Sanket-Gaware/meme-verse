import React, { useEffect, useState } from "react";
import { AllUsers } from "../../Components/AllUsers";
import { useDispatch, useSelector } from "react-redux";
import Conversation from "./Conversation";
import useSocket from "../../Components/useSocket";
import { clearUnreadUserCounts } from "../../Store/memeSlice";
// import { incrementUnread } from "../../Store/memeSlice";

const Inbox = () => {
  const { users } = useSelector((state) => state.meme);
  const username = localStorage.getItem("username");
  const currentUser = users.find((user) => user.username === username);
  const [userToChat, setUsertoChat] = useState(null);
  const BaseUrl = import.meta.env.VITE_BASE_URL;
  const socket = useSocket(`${BaseUrl}`);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearUnreadUserCounts());
  }, []);
  const handleBack = () => {
    setUsertoChat(null);
  };

  return (
    <div className="w-full overflow-hidden">
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

        <div className="h-full col-span-8">
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
