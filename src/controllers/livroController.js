import { livro } from '../models/index.js';
import { autor } from '../models/index.js';
import NaoEncontrado from '../errors/NaoEncontrado.js';

class LivroController {
  static async listarLivros(req, res, next) {
    try {
      const listarLivros = await livro.find({});
      res.status(200).json(listarLivros);
    } catch (error) {
      next(error);
    }
  }

  static async listarLivroPorId(req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);
      if (!livroEncontrado) {
        next(new NaoEncontrado('Id livro não localizado'));
      }
      res.status(200).json(livroEncontrado);
    } catch (error) {
      next(error);
    }
  }

  static async cadastrarLivro(req, res, next) {
    const novoLivro = req.body;
    try {
      const livroEncontrado = await autor.findById(novoLivro.autor);
      if (!livroEncontrado) {
        next(new NaoEncontrado('Id livro não localizado'));
      }
      const livroCompleto = {
        ...novoLivro,
        autor: { ...livroEncontrado._doc },
      };
      const livroCriado = await livro.create(livroCompleto);
      res
        .status(201)
        .json({ message: 'criado com sucesso', livro: livroCriado });
    } catch (error) {
      next(error);
    }
  }

  static async atualizarLivro(req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);
      if (!livroEncontrado) {
        next(new NaoEncontrado('Id livro não localizado'));
      }
      await livro.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: 'livro atualizado' });
    } catch (error) {
      next(error);
    }
  }

  static async excluirLivro(req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);
      if (!livroEncontrado) {
        next(new NaoEncontrado('Id livro não localizado'));
      }
      await livro.findByIdAndDelete(id);
      res.status(200).json({ message: 'livro deletado' });
    } catch (error) {
      next(error);
    }
  }

  static async listarLivroPorFiltro(req, res, next) {
    const { editora, titulo } = req.query;

    const busca = {};

    if (editora) busca.editora = editora;
    if (titulo) busca.titulo = titulo;

    try {
      const livrosPorEditora = await livro.find(busca);
      res.status(200).json(livrosPorEditora);
    } catch (error) {
      next(error);
    }
  }
}

export default LivroController;
