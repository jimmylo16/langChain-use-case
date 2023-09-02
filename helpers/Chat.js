const { getUserInput } = require("./getUserInput");

/**
 * This function is used to interact with the user with the givenChain and return th response.
 * @param {*} chain
 * @returns
 */
const Chat = async (chain) => {
  let exit = false;
  let index = 1;
  let responseText = "";
  while (exit === false) {
    const userInput = await getUserInput("Human> ");
    const quitArray = ["quit", "exit", "q", "x", " q", " x"];
    if (quitArray.includes(userInput)) {
      exit = true;
      break;
    }
    const response = await chain.call({
      query: userInput,
      callbacks: [
        {
          handleLLMNewToken(token) {
            process.stdout.write(token);
          },
        },
        {
          handleLLMStart(token) {
            process.stdout.write("AI> ");
          },
        },
      ],
      verbose: true,
    });
    console.log(" ");

    responseText = `${responseText}\n ${index}. ${response.text} \n  `;
    index++;
  }

  return responseText;
};

module.exports = { Chat };
