import { autor } from '../models/Autor.js';

class AutorController {
  static async listarAutores(req, res, next) {
    try {
      const listarAutores = await autor.find({});
      res.status(200).json(listarAutores);
    } catch (error) {
      next(error);
    }
  }

  static async listarAutorPorId(req, res, next) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id);
      if (!autorEncontrado) {
        return res.status(404).json({ message: 'Id autor não localizado' });
      }
      res.status(200).json(autorEncontrado);
    } catch (error) {
      next(error);
    }
  }

  static async cadastrarAutor(req, res, next) {
    try {
      const novoAutor = await autor.create(req.body);
      res.status(201).json({ message: 'criado com sucesso', autor: novoAutor });
    } catch (error) {
      next(error);
    }
  }

  static async atualizarAutor(req, res, next) {
    try {
      const id = req.params.id;
      await autor.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: 'autor atualizado' });
    } catch (error) {
      next(error);
    }
  }

  static async excluirAutor(req, res, next) {
    try {
      const id = req.params.id;
      await autor.findByIdAndDelete(id);
      res.status(200).json({ message: 'autor deletado' });
    } catch (error) {
      next(error);
    }
  }
}

export default AutorController;
