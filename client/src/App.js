import React, { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { FolderProvider } from "./context/FolderContext";
import Auth from "./pages/Auth";
import FolderExplorer from "./pages/FolderExplorer";
import Search from "./components/Search";
const Main = () => {
  const { token, logout } = useAuth();

  if (!token)
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
          <Auth />
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-200">
      <nav className="flex items-center justify-between px-4 py-2 bg-white shadow">
        {/* Left side: Brand + Search */}
        <div className="flex items-center gap-6 flex-1">
          <h1 className="text-xl font-bold text-blue-700 whitespace-nowrap">
            MyDrive
          </h1>
          <div className="flex-1 mt-2">
            <Search />
          </div>
        </div>

        {/* Right side: Logout */}
        <button
          onClick={logout}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Logout
        </button>
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
