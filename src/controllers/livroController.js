import { autor, livro } from '../models/index.js';
import NaoEncontrado from '../errors/NaoEncontrado.js';
import RequisicaoIncorreta from '../errors/RequisicaoIncorreta.js';

class LivroController {
  static async listarLivros(req, res, next) {
    let { limite = 5, pagina = 1 } = req.query;

    try {
      limite = parseInt(limite);
      pagina = parseInt(pagina);

      if (limite > 0 && pagina > 0) {
        const livrosResultado = await livro
          .find()
          .skip((pagina - 1) * limite)
          .limit(limite)
          .populate('autor')
          .exec();

        res.status(200).json(livrosResultado);
      } else {
        next(new RequisicaoIncorreta());
      }
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
    const busca = await processaBusca(req.query);

    if (busca !== null) {
      const livrosResultado = await livro.find(busca).populate('autor');
      res.status(200).send(livrosResultado);
    } else {
      res.status(200).send([]);
    }

    try {
      const livrosPorParametro = await livro.find(busca);
      res.status(200).json(livrosPorParametro);
    } catch (error) {
      next(error);
    }
  }
}

async function processaBusca(params) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = params;

  let busca = {};

  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = { $regex: titulo, $options: 'i' };
  if (minPaginas || maxPaginas) busca.paginas = {};
  if (minPaginas) busca.paginas.$gte = minPaginas;
  if (maxPaginas) busca.paginas.$lte = maxPaginas;
  if (nomeAutor) {
    const autorEncontrado = await autor.findOne({ nome: nomeAutor });
    if (autorEncontrado !== null) {
      busca.autor = autorEncontrado._id;
    } else {
      busca = null;
    }
  }

  return busca;
}

export default LivroController;
