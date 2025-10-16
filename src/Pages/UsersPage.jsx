import React from "react";
import { useSelector } from "react-redux";
import { AllUsers } from "../Components/AllUsers";

export default function UsersPage() {
  const { users } = useSelector((state) => state.meme);
  const username = localStorage.getItem("username");
  const currentUser = users.find((user) => user.username === username);
  return (
    <div>
          <AllUsers 
            currentUser={[currentUser]}
            users={users}
            username={username}
          />
    </div>
  );
}
