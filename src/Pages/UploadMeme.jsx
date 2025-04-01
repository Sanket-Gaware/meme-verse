import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addMeme, postMeme } from "../Store/memeSlice";

const UploadMeme = () => {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!title || !image || !caption) {
      toast.error("Please enter a title and select an image!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      //   const res = await axios.post(
      //     `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
      //     formData
      //   );
      const res = await dispatch(postMeme(formData)).unwrap(); //by using unwrap we can handle errors properly

      const imageUrl = res.data.data.url;

      console.log("Uploaded meme:", { title, imageUrl });
      toast.success("Meme uploaded successfully! 🎉");

      const newMeme = {
        id: Date.now(),
        title,
        imageUrl,
        createdAt: new Date().toISOString(),
        uploadedBy: localStorage.getItem("username"),
      };

      dispatch(addMeme(newMeme));
      // Reset
      setTitle("");
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload meme.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg pb-2 border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-center">Upload Meme</h2>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Meme Title</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-0"
          placeholder="Enter meme title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Select Meme Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border-2 border-gray-200 rounded-lg p-2 hover:border-sky-400 cursor-pointer"
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Meme Caption</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-0"
          placeholder="Enter meme caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
      </div>

      {preview && (
        <div className="mb-4">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-64 object-cover rounded-md border"
          />
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={loading}
        className="w-full bg-sky-500 text-white py-2 rounded-md font-semibold hover:bg-sky-600 transition"
      >
        {loading ? "Uploading..." : "Upload Meme"}
      </button>
    </div>
  );
};

export default UploadMeme;
