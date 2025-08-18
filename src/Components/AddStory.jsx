// components/AddStory.js
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { postStoryImage, saveStoryToDB } from "../Store/memeSlice";

const AddStory = ({ userId, onClose }) => {
  const dispatch = useDispatch();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUploadStory = async () => {
    if (!image) {
      toast.error("Please select an image to upload as a story.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);

    try {
      // Step 1: Upload image
      const res = await dispatch(postStoryImage(formData)).unwrap();
      const mediaUrl = res.data.data.url;

      // Step 2: Prepare story payload
      const storyPayload = {
        mediaUrl,
        mediaType: "image",
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
        uploadedBy: userId,
      };

      // Step 3: Save story
      const res2 = await dispatch(saveStoryToDB(storyPayload)).unwrap();

      if (res2.status === 201) {
        toast.success("Story uploaded successfully!");
        onClose();
      } else {
        toast.error("Failed to save story to database.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong during upload.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-lg max-w-md mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4">Add a Story</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full mb-4 border border-gray-300 p-2 rounded-md"
      />

      {preview && (
        <div className="mb-4">
          <img
            src={preview}
            alt="Story Preview"
            className="w-full h-64 object-cover rounded-md"
          />
        </div>
      )}

      <button
        onClick={handleUploadStory}
        disabled={loading}
        className="w-full bg-pink-500 text-white py-2 rounded-md font-semibold hover:bg-pink-600"
      >
        {loading ? "Uploading..." : "Upload Story"}
      </button>
    </div>
  );
};

export default AddStory;
