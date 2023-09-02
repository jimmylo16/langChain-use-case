const { PromptTemplate } = require("langchain/prompts");
const { LLMChain } = require("langchain/chains");

const { OpenAI } = require("langchain/llms/openai");

const getTemplateChain = (
  template = "",
  inputVariables = [""],
  outputKey = "text"
) => {
  model = new OpenAI({ modelName: "gpt-3.5-turbo", temperature: 0 });

  const prompt = new PromptTemplate({
    template: template,
    inputVariables: inputVariables,
  });

  return new LLMChain({
    llm: model,
    prompt: prompt,
    outputKey: outputKey,
  });
};

module.exports = { getTemplateChain };
