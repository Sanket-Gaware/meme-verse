import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, CircleX } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStories } from "../Store/memeSlice";
import axios from 'axios';
   
const UsersStory = ({ user, onClose }) => {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [exit, setExit] = useState(false);
  const [stories, setStories] = useState([]);
  const [currentStory, setCurrentStory] = useState(null);
    
  const dispatch = useDispatch();
  const videoRef = useRef(null);
  const durationRef = useRef(5000);
  const { allStories } = useSelector((state) => state.meme);

  useEffect(() => {
    // const fetchStories = async () => {
    //   try {
    //     // const response = await dispatch(getAllStories()).unwrap();

    //     console.log(response);
    //     const userStories = response?.stories?.filter(
    //       (item) => item.userId._id === user._id
    //     );
    //     setStories(userStories);
    //     setCurrentStory(userStories[0]);
    //     console.log(userStories[0].mediaUrl+" <=")
    //     // setCurrentStory({mediaUrl:"https://i.ibb.co/d4p5qHL5/a10.webp",mediaType:"image"})

    //   } catch (error) {
    //     console.error("Error fetching stories:", error);
    //   }
    // };
    const fetchStories = () => {
        // const BASE_URL = import.meta.env.VITE_BASE_URL;
        // const VITE_GET_ALL_STORIES = import.meta.env.VITE_GET_ALL_STORIES;

        // try {
        //   const response = await axios.get(`${BASE_URL}${VITE_GET_ALL_STORIES}`, {
        //     headers: {
        //       Authorization: `Bearer ${localStorage.getItem("Token")}`,
        //       "Content-Type": "application/json",
        //     },
        //   });

          // console.log(response);

          // const userStories = response?.data?.stories?.filter(
          //   (item) => item.userId._id === user._id
          // );
           const userStories = allStories?.stories?.filter(
            (item) => item.userId._id === user._id
          );

          setStories(userStories);
          setCurrentStory(userStories?.[0]);
          console.log(userStories?.[0]?.mediaUrl + " <=");

          // return response.data;
        // } catch (error) {
        //   console.error("Error fetching stories:", error);
        // }
    };


    // if (!allStories || !allStories?.stories) {
      fetchStories();
    // } else {
    //   const userStories = allStories?.stories?.filter(
    //     (item) => item.userId._id === user._id
    //   );
    //   setStories(userStories);
    //   setCurrentStory(userStories[current]);
    // }
  }, [dispatch, user._id]);

  // Auto-play progress logic
  useEffect(() => {
    if (!stories?.length) return;

    const story = stories[current];
    setCurrentStory(story);
    if (story.mediaType === "video") {
      durationRef.current = 30000;
    } else {
      durationRef.current = 5000;
    }

    setProgress(0);
    let startTime = Date.now();
    let animationFrame;

    const updateProgress = () => {
      if (!isPaused) {
        const elapsed = Date.now() - startTime;
        const percent = Math.min((elapsed / durationRef.current) * 100, 100);
        setProgress(percent);
        if (percent < 100) {
          animationFrame = requestAnimationFrame(updateProgress);
        } else {
          nextStory();
        }
      }
    };

    animationFrame = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animationFrame);
  }, [current, isPaused, stories]);

  const nextStory = () => {
    if (current + 1 < stories?.length) {
      setCurrent(current + 1);
    } else {
      setExit(true);
      setTimeout(() => onClose(), 300);
    }
  };

  const prevStory = () => {
    setCurrent((prev) => (prev - 1 + stories?.length) % stories?.length);
  };

  const handlePauseToggle = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <div
      onClick={handlePauseToggle}
      className={`fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center transition-opacity duration-300 ${
        exit ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Story Display */}
      {currentStory?.mediaType === "video" ? (
        <video
          ref={videoRef}
          src={currentStory.mediaUrl}
          className="absolute inset-0 w-full h-full object-contain md:object-cover"
          autoPlay
          muted
          playsInline
          onLoadedMetadata={(e) => {
            const actualDuration = e.target.duration;
            if (actualDuration < 30) {
              durationRef.current = actualDuration * 1000;
            }
          }}
        />
      ) : (
        <img
          src={currentStory?.mediaUrl ? currentStory?.mediaUrl : "https://ih1.redbubble.net/image.418462666.7453/raf,750x1000,075,t,FFFFFF:97ab1c12de.u7.jpg"}
          alt="Story"
          className=" inset-0 w-full h-auto object-contain md:object-cover"
        />
      )}

      {/* Progress Bar */}
      <div className="absolute top-3 left-0 right-0 px-4 z-20">
        <div className="flex space-x-1">
          {stories?.map((_, index) => (
            <div
              key={index}
              className="h-1 bg-white/30 rounded w-full overflow-hidden"
            >
              <div
                className={`h-full bg-white transition-all duration-100`}
                style={{
                  width:
                    index < current
                      ? "100%"
                      : index === current
                      ? `${progress}%`
                      : "0%",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* User Info */}
      <div className="absolute top-5 left-5 flex items-center z-20">
        <img
          src={user.profile}
          className="w-10 h-10 rounded-full object-cover border-2 border-pink-500"
          alt={user.fullname}
        />
        <p className="ml-3 font-semibold text-white">{user.fullname}</p>
      </div>

      {/* Close Button */}
      <button
        onClick={() => {
          setExit(true);
          setTimeout(() => onClose(), 300);
        }}
        className="absolute top-5 right-5 text-white hover:text-red-500 z-20"
      >
        <CircleX size={28} />
      </button>

      {/* Navigation */}
      {stories?.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevStory();
            }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 rounded-full z-20"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextStory();
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 rounded-full z-20"
          >
            <ChevronRight />
          </button>
        </>
      )}
    </div>
  );
};

export default UsersStory;
