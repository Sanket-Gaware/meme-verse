// import React, { useEffect, useRef, useState } from "react";
// import toast from "react-hot-toast";
// import { useDispatch } from "react-redux";
// import { postStoryImage, saveStoryToDB } from "../Store/memeSlice";

// const AddStory = ({ userId, onClose, currentUser }) => {
//   const dispatch = useDispatch();

//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const fileInputRef = useRef();

//   // Automatically open file selector on mount
//   useEffect(() => {
//     fileInputRef.current.click();
//   }, []);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//     } else {
//       onClose(); // If user cancels selection, close modal
//     }
//   };

//   const handleUploadStory = async () => {
//     if (!image) {
//       toast.error("Please select an image.");
//       return;
//     }

//     setLoading(true);

//     const formData = new FormData();
//     formData.append("image", image);

//     try {
//       const res = await dispatch(postStoryImage(formData)).unwrap();
//       const mediaUrl = res.data.data.url;

//       const storyPayload = {
//         mediaUrl,
//         mediaType: "image",
//         expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
//         uploadedBy: userId,
//       };

//       const res2 = await dispatch(saveStoryToDB(storyPayload)).unwrap();

//       if (res2.status === 201) {
//         toast.success("Story uploaded successfully!");
//         onClose();
//       } else {
//         toast.error("Failed to save story.");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Upload failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
//       <input
//         ref={fileInputRef}
//         type="file"
//         accept="image/*"
//         onChange={handleImageChange}
//         className="hidden"
//       />

//       {preview ? (
//         <div className="relative w-full h-full">
//           <img
//             src={preview}
//             alt="Preview"
//             className="w-full h-full object-cover absolute inset-0"
//           />

//           {/* Top Bar with user profile & close button */}
//           <div className="absolute top-0 left-0 w-full p-4 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent z-10">
//             <div className="flex items-center gap-3">
//               <img
//                 src={currentUser[0]?.profile}
//                 alt="Profile"
//                 className="w-10 h-10 rounded-full border-2 border-white object-cover"
//               />
//               <span className="text-white font-semibold">Your Story</span>
//             </div>
//             <button
//               onClick={onClose}
//               className="text-white text-3xl font-bold"
//               aria-label="Close"
//             >
//               &times;
//             </button>
//           </div>

//           {/* Bottom Upload Button */}
//           <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/60 to-transparent z-10">
//             <button
//               onClick={handleUploadStory}
//               disabled={loading}
//               className="w-full bg-pink-500 text-white py-3 rounded-md font-semibold text-lg hover:bg-pink-600"
//             >
//               {loading ? "Adding..." : "Add to Story"}
//             </button>
//           </div>
//         </div>
//       ) : null}
//     </div>
//   );
// };

// export default AddStory;

import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { postStoryImage, saveStoryToDB } from "../Store/memeSlice";

const AddStory = ({ userId, currentUser }) => {
  const dispatch = useDispatch();

  const [media, setMedia] = useState(null); // image or video file
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fileInputRef = useRef();

  const handleOpenFile = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMedia(file);
      setPreview(URL.createObjectURL(file));
      setShowModal(true);
    }
  };

  const handleUploadStory = async () => {
    if (!media) {
      toast.error("Please select a file.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("image", media); // Can be renamed to "media" if backend accepts both types

    try {
      const res = await dispatch(postStoryImage(formData)).unwrap();
      const mediaUrl = res.data.data.url;

      const storyPayload = {
        mediaUrl,
        mediaType: media.type.startsWith("video") ? "video" : "image",
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        uploadedBy: userId,
      };

      const res2 = await dispatch(saveStoryToDB(storyPayload)).unwrap();

      if (res2.status === 201) {
        toast.success("Story uploaded successfully!");
        handleCloseModal();
      } else {
        toast.error("Failed to save story.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setMedia(null);
    setPreview(null);
  };

  return (
    <>
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Add Story Button */}
            <div className="flex flex-col justify-between h-full min-h-screen px-4 py-6">
              <div className="flex items-start gap-3">
                <img
                  src={currentUser[0]?.profile}
                  alt="Profile"
                  className="w-12 h-12 rounded-full border-2 border-white object-cover"
                />
                <div className="flex flex-col">
                  <span className="text-dark font-semibold"> 
                    {currentUser[0]?.fullname || "You"}
                  </span>
                  <span className="text-sm text-gray-300">Your Story</span>
                </div>
                <button
                onClick={handleCloseModal}
                className="text-dark text-3xl font-bold"
                aria-label="Close"
              >
                &times;
              </button>
              </div>

              {/* Bottom Section: Add Story Button */}
              <button
                onClick={handleOpenFile}
                className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white py-2 px-4 rounded-full font-semibold hover:scale-105 transition"
              >
                + Add to Story
              </button>
            </div>

      {/* Preview Modal */}
      {showModal && preview && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="relative w-full h-full">

            {/* Render Image or Video */}
            {media.type.startsWith("video") ? (
              <video
                src={preview}
                controls
                className="w-full h-full absolute inset-0 object-contain bg-black"
              />
            ) : (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full absolute inset-0 object-contain bg-black"
              />
            )}

            {/* Top Bar with User Info */}
            <div className="absolute top-0 left-0 w-full p-4 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent z-10">
              <div className="flex items-center gap-3">
                <img
                  src={currentUser[0]?.profile}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
                <div className="flex flex-col">
                  <span className="text-white font-semibold">
                    {currentUser[0]?.username || "You"}
                  </span>
                  <span className="text-sm text-gray-300">Your Story</span>
                </div>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-white text-3xl font-bold"
                aria-label="Close"
              >
                &times;
              </button>
            </div>

            {/* Bottom Upload Button */}
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/60 to-transparent z-10">
              <button
                onClick={handleUploadStory}
                disabled={loading}
                className="w-full bg-pink-500 text-white py-3 rounded-md font-semibold text-lg hover:bg-pink-600"
              >
                {loading ? "Adding..." : "Add to Story"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddStory;
