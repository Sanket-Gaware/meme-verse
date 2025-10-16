import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import AddStory from "../Components/AddStory";
import { useLocation } from 'react-router-dom';

const StoryPage = () => {
  // const username = localStorage.getItem("username");
  // const { users } = useSelector((state) => state.meme);
  // const currentUser = users.find((user) => user.username === username);
  const location = useLocation();
  const { currentUser } = location.state || {};
  
	return(
			<div>
					<AddStory
	                  userId={currentUser[0]?._id}
	                  currentUser={currentUser}
	                />
			</div>
		)
}