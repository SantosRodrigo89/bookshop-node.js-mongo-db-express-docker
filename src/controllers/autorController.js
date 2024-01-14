import { autor } from '../models/Autor.js';
import mongoose from 'mongoose';

class AutorController {
  static async listarAutores(req, res) {
    try {
      const listarAutores = await autor.find({});
      res.status(200).json(listarAutores);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha na requisição` });
    }
  }

  static async listarAutorPorId(req, res) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id);
      if (!autorEncontrado) {
        return res.status(404).json({ message: 'Id autor não localizado' });
      }
      res.status(200).json(autorEncontrado);
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        res
          .status(400)
          .send({ message: 'Um ou mais dados específicos estão incorretos' });
      }

      res
        .status(500)
        .json({ message: `${error.message} - falha na requisição do autor` });
    }
  }

  static async cadastrarAutor(req, res) {
    try {
      const novoAutor = await autor.create(req.body);
      res.status(201).json({ message: 'criado com sucesso', autor: novoAutor });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao cadastrar autor` });
    }
  }

  static async atualizarAutor(req, res) {
    try {
      const id = req.params.id;
      await autor.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: 'autor atualizado' });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha na atualização do autor` });
    }
  }

  static async excluirAutor(req, res) {
    try {
      const id = req.params.id;
      await autor.findByIdAndDelete(id);
      res.status(200).json({ message: 'autor deletado' });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao deletar autor` });
    }
  }
}

export default AutorController;
