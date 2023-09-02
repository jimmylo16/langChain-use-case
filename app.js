const dotenv = require("dotenv");
dotenv.config();
const { getUserInput } = require("./helpers/getUserInput");
const { getPDFChain } = require("./helpers/getPDFChain");
const { SequentialChain, TransformChain } = require("langchain/chains");

const { getChatChain } = require("./helpers/getChatChain");
const { getTemplateChain } = require("./helpers/getTemplateChain");
const { performGoogleSearch } = require("./helpers/performGoogleSearchs");

async function main() {
  //   Read the pdf and save in vector store
  const pdfChain = await getPDFChain();

  let exit = false;
  let index = 1;
  let responseText = "";
  while (exit === false) {
    const userInput = await getUserInput("Human> ");
    const response = await pdfChain.call({
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
    const quitArray = ["quit", "exit", "q", "x", " q", " x"];
    if (quitArray.includes(userInput)) {
      exit = true;
    }
    responseText = `${responseText}\n ${index}. ${response.text} \n  `;
    index++;
  }

  const template1 = `the following is a list of information from a CV, give the main word for the given sentence
  if the sentence contains I don' know ignore that sentence and give me only one main word of every other sentence separated by commas 
  \n {responseText} `;

  const chain1 = getTemplateChain(template1, ["responseText"], "mainWords");
  const template2 = `for this string give me the words related to abilities and tell me the position that make a good fit for that abilities or technology {mainWords}`;
  const chain2 = getTemplateChain(template2, ["mainWords"], "position");

  const sequentialChain = new SequentialChain({
    chains: [chain1, chain2],
    inputVariables: ["responseText"],
  });

  const position = await sequentialChain.call({ responseText: responseText });

  const transformChain = new TransformChain({
    transform: performGoogleSearch,
    inputVariables: ["position"],
  });

  const response = await transformChain.call({
    position: `Best skills  of: ${position}`,
  });

  console.log(`the best position for you is: `, position);
  console.log(response);
}

main();
