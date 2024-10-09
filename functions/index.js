const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");

admin.initializeApp();

exports.commitReadme = functions.https.onCall(async (data, context) => {
  const { token, repoOwner, repoName } = data;

  if (!token || !repoOwner || !repoName) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "The function must be called with valid arguments."
    );
  }

  const readmeContent =
    "# Sample README\n\nThis is a sample README committed by the Firebase Function."; // Content of the README
  const commitMessage = "Add README file";

  try {
    // Get the current date and time to create a unique path for the README file
    const path = "README.md";

    // Check if the README file exists
    const fileResponse = await axios.get(
      `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`,
      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    );

    // If the file exists, get the SHA for the existing file
    const fileSHA = fileResponse.data.sha;

    // Create or update the README file
    const response = await axios.put(
      `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`,
      {
        message: commitMessage,
        content: Buffer.from(readmeContent).toString("base64"), // Encode the content to base64
        sha: fileSHA, // Pass the existing SHA to update the file
      },
      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    );

    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error committing README: ", error);
    throw new functions.https.HttpsError(
      "internal",
      "Unable to commit README: " + error.message
    );
  }
});
