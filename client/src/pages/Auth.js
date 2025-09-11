import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Auth = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/auth/signup`, form);
        setIsSignup(false);
      } else {
        const { data } = await axios.post(
          `${process.env.REACT_APP_API_URL_BACKEND}/auth/login`,
          form
        );
        login(data.token);
      }
      setError("");
    } catch (err) {
      setError("Authentication Failed. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        {isSignup ? "Signup" : "Login"}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          required
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition cursor-pointer"
        >
          {isSignup ? "Signup" : "Login"}
        </button>
      </form>
      <button
        onClick={() => setIsSignup((x) => !x)}
        className="mt-4 w-full text-center text-indigo-600 hover:underline cursor-pointer"
      >
        {isSignup ? "Switch to Login" : "Switch to Signup"}
      </button>
      {error && (
        <p className="text-red-600 mt-4 text-center font-medium">{error}</p>
      )}
    </div>
  );
};

export default Auth;
