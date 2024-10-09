import { useAuth } from "../../context";
import { useEffect, useState } from "react";
import axios from "axios";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";

export const Links = () => {
  const { data, user } = useAuth();
  const [repos, setRepos] = useState([]);
  const db = getFirestore();

  console.log(data, user);

  useEffect(() => {
    if (data) {
      const fetchRepos = async () => {
        const response = await axios.get(
          `https://api.github.com/users/${data.screenName}/repos`
        );
        setRepos(response.data);

        const linkedRepoDoc = doc(db, "users", data.localId);
        const linkedRepoSnapshot = await getDoc(linkedRepoDoc);

        if (!linkedRepoSnapshot.exists()) {
          await setDoc(linkedRepoDoc, {
            linkedRepos: response.data.map((repo) => ({
              name: repo.name,
              url: repo.html_url,
            })),
          });
        }
      };
      fetchRepos();
    }
  }, [data, db]);

  const commitReadme = async (repoName) => {
    const functions = getFunctions();
    const commitReadmeFunc = httpsCallable(functions, "commitReadme");

    const response = await commitReadmeFunc({
      token: data.oauthAccessToken,
      repoOwner: data.login,
      repoName: repoName,
    });

    
    if (response.data.success) {
      alert("README committed successfully!");
    } else {
      alert("Failed to commit README: " + response.data.error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold">Your GitHub Repositories</h2>
      <ul className="list-disc mt-4">
        {repos.map((repo) => (
          <li key={repo.id} className="flex justify-between items-center">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              {repo.name}
            </a>
            <button
              onClick={() => commitReadme(repo.name)}
              className="ml-4 bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded"
            >
              Commit README
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
