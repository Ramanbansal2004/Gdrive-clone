import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const ImageManager = ({ currentFolder, setImageBool }) => {
  const { token } = useAuth();
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");
  const fileInputRef = useRef();
  // Fetch images by folder
  useEffect(() => {
    if (currentFolder)
      axios
        .get(`http://localhost:5000/image/by-folder/${currentFolder}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setImages(res.data));
  }, [currentFolder, token]);

  // Upload Image
  const handleUpload = async () => {
    if (!file || !name) return;
    const form = new FormData();
    form.append("name", name);
    form.append("folder", currentFolder);
    form.append("image", file);
    const { data } = await axios.post(
      "http://localhost:5000/image/upload",
      form,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setImages([...images, data]);
    setName("");
    fileInputRef.current.value = "";
    setFile(null);
    setImageBool(false);
  };

  // Search Images
  const handleSearch = async () => {
    if (!search) return;
    const { data } = await axios.get(
      `http://localhost:5000/image/search?query=${search}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setImages(data);
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 p-6 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto z-50">
      <section className="bg-white p-4 rounded-lg shadow">
        <h4 className="text-lg font-semibold mb-3">Upload Image</h4>
        <input
          className="border border-gray-300 rounded px-3 py-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={name}
          placeholder="Image Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          className="mb-3"
          ref={fileInputRef}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button
          onClick={handleUpload}
          disabled={!file || !name}
          className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-700 hover:cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Upload
        </button>
        <button
          onClick={() => setImageBool(false)}
          className="bg-blue-400 mx-2 text-white px-4 py-2 rounded hover:bg-blue-700 hover:cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      </section>
    </div>
  );
};

export default ImageManager;
