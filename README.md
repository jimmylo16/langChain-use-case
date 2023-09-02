# DESCRIPTION

In this project you can read info of a given CV and do questions about it, afterwards, you can quit the chat and obtain internet recomendations for the skills to be improved
This application can be extended in many aspects, such as: asking the user what position he/she is going to apply for and see if it is a good fit, automatic selection of the candidates that best fit the company, limited only to the imagination, this could streamline the selection processes that today are so time-consuming.

# langChain-uses

1. ETL (Data Source): pdf CV
2. LangChain’s memory module -> Chat part.
3. Retrieval Augmented Generation -> Chat part.
4. Sequential Chain -> Retrieve main word from the chat related to the pdf
5. Transform Chain or Router Chain -> Search in google the skills related to that main word

# Running the project

go to the root directory and execute the following command

```bash
$ node app.js
```
