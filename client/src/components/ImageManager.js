import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const ImageManager = ({ folderId }) => {
  const { token } = useAuth();
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");
  const fileInputRef = useRef();
  // Fetch images by folder
  useEffect(() => {
    if (folderId)
      axios
        .get(`http://localhost:5000/image/by-folder/${folderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setImages(res.data));
  }, [folderId, token]);

  // Upload Image
  const handleUpload = async () => {
    if (!file || !name) return;
    const form = new FormData();
    form.append("name", name);
    form.append("folder", folderId);
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
    <div className="flex flex-col gap-6">
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
      </section>

      <section className="bg-white p-4 rounded-lg shadow">
        <h4 className="text-lg font-semibold mb-3">Search Your Images</h4>
        <div className="flex gap-2 mb-3">
          <input
            value={search}
            placeholder="Image Name"
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSearch}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Search
          </button>
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((img) => (
            <li
              key={img._id}
              className="flex flex-col items-center bg-gray-50 p-3 rounded shadow hover:shadow-md"
            >
              <span className="text-sm font-medium mb-2">{img.name}</span>
              <img
                src={img.imageUrl}
                alt={img.name}
                className="w-24 h-24 object-cover rounded"
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ImageManager;
