import express from "express";
import AutorController from "../controllers/autorController.js";

const routes = express.Router();

routes.get("/livros", AutorController.listarAutores);
routes.get("/livros/:id", AutorController.listarAutorPorId);
routes.post("/livros/", AutorController.cadastrarAutor);
routes.put("/livros/:id", AutorController.atualizarAutor);
routes.delete("/livros/:id", AutorController.excluirAutor);

export default routes;
