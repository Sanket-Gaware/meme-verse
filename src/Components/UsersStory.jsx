import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, CircleX } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStories } from "../Store/memeSlice";

const UsersStory = ({ user, onClose }) => {
  // const stories = user?.stories || [
  //   {
  //     type: "image",
  //     src: "https://img.freepik.com/free-photo/vertical-shot-river-surrounded-by-mountains-meadows-scotland_181624-27881.jpg?ga=GA1.1.460469474.1743504356&semt=ais_hybrid&w=740",
  //   },
  //   { type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
  //   {
  //     type: "image",
  //     src: "https://img.freepik.com/premium-photo/munnar-tea-plantations-with-fog-early-morning_211251-1129.jpg?ga=GA1.1.460469474.1743504356&semt=ais_hybrid&w=740",
  //   },
  // ];

  const [current, setCurrent] = useState(0);
  const username = localStorage.getItem("username");
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [exit, setExit] = useState(false);
  const videoRef = useRef(null);
  const durationRef = useRef(5000);
  const dispatch = useDispatch();
  const { allStories, users } = useSelector((state) => state.meme);
  const [stories, setStories] = useState([]);
  const [currentStory, setCurrentStory] = useState(null);
  const currentUser = users.filter((user) => user.username == username);
  // const isVideo = currentStory?.type === "video";

  // allStories !== null ? Stories() : setStories(allStories);

  // allStories === null ? Stories() : "";
  console.log(allStories.stories);

  useEffect(() => {
    const Stories = async () => {
      try {
        const response = await dispatch(getAllStories()).unwrap();

        const userStories = response?.find((item) => item.userId === user._id);
        if (userStories?.stories?.length > 0) {
          setStories(userStories.stories);
        } else {
          setStories([]);
        }
      } catch (error) {
        console.error("Error fetching user story:", error);
      }
    };
    console.log(allStories.stories);
    if (!allStories.stories) Stories();
    else {
      const userStories = allStories.stories?.find(
        (item) => item.userId === user._id
      );
      setStories(userStories?.stories || []);
    }
    setCurrentStory(
      stories?.filter((story) => story.userId.username == username)
    );

    // Set duration depending on type
    if (currentStory?.mediaType === "video") {
      durationRef.current = 30000; // 30 seconds
    } else {
      durationRef.current = 5000; // 5 seconds for images
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
      } else {
        startTime += Date.now() - startTime; // Adjust for pause
      }
    };

    animationFrame = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animationFrame);
  }, [current, isPaused]);

  const nextStory = () => {
    if (current + 1 < stories.length) {
      setCurrent(current + 1);
    } else {
      setExit(true);
      setTimeout(() => onClose(), 300); // Allow fade-out
    }
  };

  const prevStory = () => {
    setCurrent((current - 1 + stories.length) % stories.length);
  };

  const handlePauseToggle = () => {
    setIsPaused((prev) => !prev);
  };

  console.log(currentStory);
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
          src={currentStory.mediaUrl}
          alt="Story"
          className="absolute inset-0 w-full h-auto object-contain md:object-cover"
        />
      )}

      {/* Progress Bar */}
      <div className="absolute top-3 left-0 right-0 px-4 z-20">
        <div className="flex space-x-1">
          {stories.map((_, index) => (
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
      {stories.length > 1 && (
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
