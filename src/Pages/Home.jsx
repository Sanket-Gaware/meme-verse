import React, { useEffect, useState } from "react";
import PostedMemeCard from "../Components/PostedMemeCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchMemes, fetchUsers, getAllMemes } from "../Store/memeSlice";
import TopBar from "../Components/TopBar";
import { AllUsers } from "../Components/AllUsers";
import { useRef } from "react";
import { useCallback } from "react";
const Loader = React.lazy(() => import("../Components/Loader"));

function Home() {
  const username = localStorage.getItem("username");
  const dispatch = useDispatch();
  const { memes, users, loading, error, likedMemes, comments, allUsersMemes } =
    useSelector((state) => state.meme);
  const [newMemes, setNewMemes] = useState(memes);

  // const handleUserMemes = async () => {
  //   try {
  //     const response = await dispatch(getAllMemes()).unwrap();
  //     const userMemes = response.data.map((meme) => ({
  //       box_count: 0,
  //       captions: meme.caption,
  //       id: meme._id,
  //       name: meme.title,
  //       url: meme.image,
  //       uploadedBy: meme.uploadedBy,
  //     }));
  //     setNewMemes(memes.concat(userMemes));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   dispatch(fetchMemes());
  //   dispatch(fetchUsers());
  //   allUsersMemes == ""
  //     ? handleUserMemes()
  //     : setNewMemes(
  //         memes.concat(
  //           allUsersMemes.data.map((meme) => ({
  //             box_count: 0,
  //             captions: meme.caption,
  //             id: meme._id,
  //             name: meme.title,
  //             url: meme.image,
  //             uploadedBy: meme.uploadedBy,
  //           }))
  //         )
  //       );
  // }, []);

  const hasFetched = useRef(false);

  const processUserMemes = useCallback((data) => {
    return data.map((meme) => ({
      box_count: 0,
      captions: meme.caption,
      id: meme._id,
      name: meme.title,
      url: meme.image,
      uploadedBy: meme.uploadedBy,
    }));
  }, []);

  // Main fetch logic - guaranteed to run only once
  const init = useCallback(async () => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    try {
      await dispatch(fetchMemes()).unwrap();
      await dispatch(fetchUsers()).unwrap();

      if (!allUsersMemes || allUsersMemes === "") {
        const response = await dispatch(getAllMemes()).unwrap();
        const userMemes = processUserMemes(response.data);
        setNewMemes(memes.concat(userMemes));
      } else {
        const userMemes = processUserMemes(allUsersMemes.data);
        setNewMemes(memes.concat(userMemes));
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }, [dispatch, memes, allUsersMemes, processUserMemes]);

  // Single effect that runs the init function once
  useEffect(() => {
    init();
  }, [init]);

  if (loading) return <Loader />;
  if (error)
    return (
      <p className="flex items-center my-auto justify-center text-red-400">
        Error: {error}
      </p>
    );

  const currentUser = users.filter((user) => user.username == username);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 w-full ">
      <TopBar currentUser={currentUser} users={users} username={username} />
      <div className="col-span-8 text-center overflow-y-scroll px-3">
        <PostedMemeCard
          memes={newMemes}
          likedMemes={likedMemes}
          comments={comments}
          users={users}
        />
      </div>
      <div className="col-span-4 col border-l-1 border-gray-300 top-0 hidden md:block">
        <div className="fixed">
          <AllUsers
            currentUser={currentUser}
            users={users}
            username={username}
            home={true}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
