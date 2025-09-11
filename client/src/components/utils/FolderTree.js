import React, { useState} from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useFolder } from "../../context/FolderContext";
const FolderTree = ({ setFolderBool, currentFolder }) => {
  const { token } = useAuth();
  const {setFolders}=useFolder();
  const [newFolder, setNewFolder] = useState({
    name: "",
    parent: currentFolder,
  });
  const handleCreateFolder = async () => {
    if (!newFolder.name) return;
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL_BACKEND}/folder/create`,
      newFolder,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setFolders((prev)=>[...prev, data]);
    setFolderBool(false);
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 p-6 rounded-lg shadow-lg w-80 z-50">
      <h3 className="text-xl font-semibold mb-2">New folder</h3>
      <div className="bg-white p-4 rounded shadow">
        <input
          className="w-full mb-2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={newFolder.name}
          onChange={(e) => setNewFolder({ ...newFolder, name: e.target.value })}
          placeholder="New folder name"
        />
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleCreateFolder}
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Create Folder
          </button>
          <button
            onClick={() => setFolderBool(false)}
            className="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FolderTree;
