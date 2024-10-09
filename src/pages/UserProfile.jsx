import { useAuth } from "../context";
import { Route, Routes, Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { Links } from "./1/Links";
import { Choice } from "./Choice";

export const UserProfile = () => {
  const { user, logout } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-lg text-white w-auto mx-auto">
      <img
        src={user?.photoURL || "/default-profile.png"}
        alt="Profile"
        className="w-24 h-24 rounded-full border-4 border-white mb-4"
      />
      <h2 className="text-3xl font-bold mb-4 text-center">
        Welcome, {user?.displayName}!
      </h2>
      <Routes>
        <Route path="/" exact element={<Choice />} />
        <Route path="/github" element={<Links />} />
      </Routes>
      <footer className="flex gap-4 my-4 items-center justify-center">
        <Link to="/" className="cursor-pointer">
          <FaHome className="bg-black rounded p-2 text-4xl transition duration-300 hover:bg-gray-700 cursor-pointer" />
        </Link>
        <button
          onClick={logout}
          className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition-transform transform hover:scale-105 duration-300"
        >
          Sign Out
        </button>
      </footer>
    </div>
  );
};



