import React, { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import {FolderProvider} from "./context/FolderContext";
import Auth from "./components/Auth";
import FolderExplorer from "./components/FolderExplorer";
const Main = () => {
  const { token, logout } = useAuth();

  if (!token) return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <Auth />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-200">
      <nav className="flex justify-between items-center p-4 bg-white shadow">
        <h1 className="text-xl font-bold text-blue-700">MyDrive</h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >Logout</button>
      </nav>
      <div className="">
        <FolderExplorer />
      </div>
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <FolderProvider>
      <Main />
    </FolderProvider>
  </AuthProvider>
);

export default App;
