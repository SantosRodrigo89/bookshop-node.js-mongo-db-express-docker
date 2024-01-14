import express from "express";
import databaseConnect from "./config/dbConnect.js";
import livro from "./models/livro.js";

const connection = await databaseConnect();

connection.on("error", (err) => {
  console.error("connection error", err);
});

connection.once("open", () => {
  console.log("connection success");
});

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Home: Curso de Node");
});

app.get("/livros", async (req, res) => {
  const booksList = await livro.find({})
  res.status(200).json(booksList);
});

app.get("/livros/:id", (req, res) => {
  const index = buscaLivro(req.params.id);
  res.status(200).json(livros[index]);
});

app.post("/livros", (req, res) => {
  livros.push(req.body);
  res.status(201).send("Livro cadastrado com sucesso");
});

app.put("/livros/:id", (req, res) => {
  const index = buscaLivro(req.params.id);
  livros[index].titulo = req.body.titulo;
  res.status(200).json(livros);
});

app.delete("/livros/:id", (req, res) => {
  const index = buscaLivro(req.params.id);
  livros.splice(index, 1);
  res.status(200).send("Livro removido com sucesso");
});

export default app;
