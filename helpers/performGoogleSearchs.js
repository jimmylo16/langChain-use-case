const googleIt = require("google-it");

async function performGoogleSearch(inputs) {
  try {
    const results = await googleIt({ query: inputs.position });
    return { links: results };
  } catch (error) {
    console.error("Error:", error);
  }
}

module.exports = { performGoogleSearch };
