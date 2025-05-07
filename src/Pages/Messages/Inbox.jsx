import React, { useState } from "react";
import { AllUsers } from "../../Components/AllUsers";
import { useSelector } from "react-redux";
import Conversation from "./Conversation";

const Inbox = () => {
  const { users } = useSelector((state) => state.meme);
  const username = localStorage.getItem("username");
  const currentUser = users.filter((user) => user.username === username);
  const [userToChat, setUsertoChat] = useState(null);

  const handleBack = () => {
    setUsertoChat(null);
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      {/* Desktop layout */}
      <div className="hidden md:grid grid-cols-12 h-full">
        <div className="col-span-5">
          <AllUsers
            currentUser={currentUser}
            users={users}
            username={username}
            setUsertoChat={setUsertoChat}
          />
        </div>

        <div className="relative h-full col-span-7">
          {userToChat ? (
            <Conversation suid={userToChat} setUsertoChat={setUsertoChat} />
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
            currentUser={currentUser}
            users={users}
            username={username}
            setUsertoChat={setUsertoChat}
          />
        ) : (
          <Conversation suid={userToChat} setUsertoChat={handleBack} />
        )}
      </div>
    </div>
  );
};

export default Inbox;
