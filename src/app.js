import express from "express";
import databaseConnect from "./config/dbConnect.js";
import routes from "./routes/index.js";

const connection = await databaseConnect();

connection.on("error", (err) => {
  console.error("connection error", err);
});

connection.once("open", () => {
  console.log("connection success");
});

const app = express();
routes(app)

app.delete("/livros/:id", (req, res) => {
  const index = buscaLivro(req.params.id);
  livros.splice(index, 1);
  res.status(200).send("Livro removido com sucesso");
});

export default app;
