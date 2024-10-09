import { FaGithub } from "react-icons/fa";
import { useAuth } from "./context";
import { UserProfile } from "./pages";

function App() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black relative overflow-hidden text-white">
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 opacity-20 filter blur-3xl"></div>
        <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 opacity-30 filter blur-3xl"></div>
      </div>
      {user ? <UserProfile /> : <Welcome />}
      <footer className="absolute bottom-4 text-gray-400">
        <p>© 2024 CodeCrack. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;

const Welcome = () => {
  const { signInWithGithub, loading } = useAuth();

  return (
    <div className="relative z-10 text-center space-y-6">
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        CodeCrack
      </h1>

      <p className="text-lg max-w-md mx-auto font-medium">
        Unlock the secrets to mastering LeetCode with CodeCrack, your AI-powered
        assistant offering real-time hints, solution reviews, and personalized
        question recommendations.
      </p>

      <button
        onClick={signInWithGithub}
        disabled={loading}
        className={`mt-8 gap-4 inline-flex items-center px-6 py-3 ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800"
        } text-white font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300`}
      >
        {loading ? (
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-300 mr-2"></div>
        ) : (
          <FaGithub size={30} />
        )}
        {loading ? "Signing in..." : "Sign in with GitHub"}
      </button>
    </div>
  );
};
