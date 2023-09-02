const { PDFLoader } = require("langchain/document_loaders/fs/pdf");
const { CharacterTextSplitter } = require("langchain/text_splitter");
const { FaissStore } = require("langchain/vectorstores/faiss");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const { RetrievalQAChain } = require("langchain/chains");
const { OpenAI } = require("langchain/llms/openai");

async function getPDFChain(src = "pdfs/CV-Eng-Jimmy-Lopez.pdf") {
  const model = new OpenAI({ streaming: true });
  await savePdf(src);

  const vectorStore = await FaissStore.load(
    "./vectorStore",
    new OpenAIEmbeddings()
  );

  const retriever = vectorStore.asRetriever({ k: 3 });
  const chain = RetrievalQAChain.fromLLM(
    model,
    retriever,
    (options = { returnSourceDocuments: true })
  );

  return chain;
}

const savePdf = async (src) => {
  const loader = new PDFLoader(src);

  const docs = await loader.load();

  const textSplitter = new CharacterTextSplitter({
    chunkSize: 200,
    chunkOverlap: 50,
  });
  const documents = await textSplitter.splitDocuments(docs);

  const vectorstores = await FaissStore.fromDocuments(
    documents,
    new OpenAIEmbeddings()
  );

  await vectorstores.save("./vectorStore");
};

module.exports = { getPDFChain };
