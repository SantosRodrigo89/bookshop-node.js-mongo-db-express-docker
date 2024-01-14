import livro from "../models/livro.js";

class LivroController {
  static async listarLivros(req, res) {
    const booksList = await livro.find({});
    res.status(200).json(booksList);
  }

  static async cadastrarLivros(req, res) {
    try {
      const novoLivro = await livro.create(req.body);
      res
        .status(201)
        .json({ message: "criado com sucesso", livro: novoLivro });
    } catch (error) {
      res
        .status(500)
        .json({ mwssage: `${error.message} - falha ao cadastrar livro` });
    }
  }
}

export default LivroController;
