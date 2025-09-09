// // components/AddStory.js
// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import { useDispatch } from "react-redux";
// import { postStoryImage, saveStoryToDB } from "../Store/memeSlice";

// const AddStory = ({ userId, onClose, currentUser }) => {
//   const dispatch = useDispatch();

//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [loading, setLoading] = useState(false);
 
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   const handleUploadStory = async () => {
//     if (!image) {
//       toast.error("Please select an image to upload as a story.");
//       return;
//     }

//     setLoading(true);

//     const formData = new FormData();
//     formData.append("image", image);

//     try {
//       // Step 1: Upload image
//       const res = await dispatch(postStoryImage(formData)).unwrap();
//       const mediaUrl = res.data.data.url;

//       // Step 2: Prepare story payload
//       const storyPayload = {
//         mediaUrl,
//         mediaType: "image",
//         expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
//         uploadedBy: userId,
//       };

//       // Step 3: Save story
//       const res2 = await dispatch(saveStoryToDB(storyPayload)).unwrap();

//       if (res2.status === 201) {
//         toast.success("Story uploaded successfully!");
//         onClose();
//       } else {
//         toast.error("Failed to save story to database.");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Something went wrong during upload.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="relative p-5 bg-white rounded-md shadow-lg max-w-md mx-auto  w-screen h-screen mt-10 border">
//        <button
//       onClick={onClose}
//       className="absolute cursor-pointer top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
//       aria-label="Close"
//     >
//       &times;
//     </button>
//     <div className="flex overflow-x-auto no-scrollbar px-4 py-3 gap-4">
//           <div
//             className="flex flex-col items-center relative flex-shrink-0"
//           >
//             <img
//               className="h-14 w-14 rounded-full border-2 border-gray-500 object-cover"
//               src={currentUser[0]?.profile}
//               alt="Your Story"
//             />
//            </div>
//       <h2 className="text-xl font-semibold mb-4">Add a Story</h2>
// </div>
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleImageChange}
//         className="w-full mb-4 border border-gray-300 p-2 rounded-md"
//       />

//       {preview && (
//         <div className="mb-4">
//           <img
//             src={preview}
//             alt="Story Preview"
//             className="absolute z-index-1 w-screen h-screen object-cover rounded-md"
//           />
//         </div>
//       )}

//       <button
//         onClick={handleUploadStory}
//         disabled={loading}
//         className="w-full bg-pink-500 text-white py-2 rounded-md font-semibold hover:bg-pink-600"
//       >
//         {loading ? "Uploading..." : "Upload Story"}
//       </button>
//     </div>
//   );
// };

// export default AddStory;


// components/AddStory.js
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { postStoryImage, saveStoryToDB } from "../Store/memeSlice";

const AddStory = ({ userId, onClose, currentUser }) => {
  const dispatch = useDispatch();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef();

  // Automatically open file selector on mount
  useEffect(() => {
    fileInputRef.current.click();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      onClose(); // If user cancels selection, close modal
    }
  };

  const handleUploadStory = async () => {
    if (!image) {
      toast.error("Please select an image.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await dispatch(postStoryImage(formData)).unwrap();
      const mediaUrl = res.data.data.url;

      const storyPayload = {
        mediaUrl,
        mediaType: "image",
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        uploadedBy: userId,
      };

      const res2 = await dispatch(saveStoryToDB(storyPayload)).unwrap();

      if (res2.status === 201) {
        toast.success("Story uploaded successfully!");
        onClose();
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

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />

      {preview ? (
        <div className="relative w-full h-full">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover absolute inset-0"
          />

          {/* Top Bar with user profile & close button */}
          <div className="absolute top-0 left-0 w-full p-4 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent z-10">
            <div className="flex items-center gap-3">
              <img
                src={currentUser[0]?.profile}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />
              <span className="text-white font-semibold">Your Story</span>
            </div>
            <button
              onClick={onClose}
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
      ) : null}
    </div>
  );
};

export default AddStory;
