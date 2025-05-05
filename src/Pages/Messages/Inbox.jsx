import React, { useState } from "react";
import { AllUsers } from "../../Components/AllUsers";
import { useSelector } from "react-redux";
import Conversation from "./Conversation";
const Inbox = () => {
  const { users } = useSelector((state) => state.meme);
  const username = localStorage.getItem("username");
  const currentUser = users.filter((user) => user.username == username);
  const [userToChat, setUsertoChat] = useState(null);

  return (
    <div>
      {userToChat == null ? (
        <AllUsers
          currentUser={currentUser}
          users={users}
          username={username}
          setUsertoChat={setUsertoChat}
        />
      ) : (
        <Conversation suid={userToChat} setUsertoChat={setUsertoChat} />
      )}
    </div>
  );
};
export default Inbox;
