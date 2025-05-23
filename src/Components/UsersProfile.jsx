import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserMemes } from "../redux/slices/memeSlice";

const UsersProfile = ({ user, username }) => {
  const dispatch = useDispatch();
  const [userMemes, setUserMemes] = useState([]);

  useEffect(() => {
    const fetchUserMemes = async () => {
      try {
        const response = await dispatch(getUserMemes(username)).unwrap();
        const formattedMemes = response.data.map((meme) => ({
          ...meme,
          name: meme.title,
          url: meme.image,
        }));
        setUserMemes(formattedMemes);
      } catch (error) {
        console.error("Error fetching user memes:", error);
      }
    };

    if (username) {
      fetchUserMemes();
    }
  }, [dispatch, username]);

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4">
      {/* Profile Details */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={user?.profile || "/default-profile.png"}
          alt={user?.fullname}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold">{user?.fullname}</h2>
          <p className="text-gray-600">@{username}</p>
        </div>
      </div>

      {/* User Posts / Memes */}
      <div className="w-full">
        <h3 className="text-xl font-semibold mb-4">Posts</h3>
        {userMemes.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {userMemes.map((meme) => (
              <div
                key={meme.id}
                className="border rounded-lg overflow-hidden shadow-sm"
              >
                <img
                  src={meme.url}
                  alt={meme.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-2">
                  <p className="font-medium truncate">{meme.name}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default UsersProfile;
