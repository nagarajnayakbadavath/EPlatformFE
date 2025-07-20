
import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

const UploadNewCourses = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return alert("Please select a video file");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);

    try {
      const adminId=localStorage.getItem("_id");
      const token=localStorage.getItem("token");
      const res = await axios.post(
        `${API_URL}/${adminId}/upload/videos`, // 🔁 Replace with actual adminId
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Course Uploaded Successfully!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      setMessage("Upload Failed");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Upload New Course (Video)</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Upload Video
        </button>
        {message && <p className="text-green-600">{message}</p>}
      </form>
    </div>
  );
};

export default UploadNewCourses;
