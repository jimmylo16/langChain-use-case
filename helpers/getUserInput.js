const readline = require("readline");
/**
 * With this function we can ask the user a question and wait for the response
 * @param {*} query , rl readline interface
 * @returns
 */
function getUserInput(query) {
  const rl = createReadLine();
  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
}

function createReadLine() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return rl;
}

module.exports = { getUserInput, createReadLine };
