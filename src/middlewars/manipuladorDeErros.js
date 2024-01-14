import mongoose from 'mongoose';
import ErroBase from '../errors/ErroBase.js';
import RequisicaoIncorreta from '../errors/RequisicaoIncorreta.js';
import NaoEncontrado from '../errors/NaoEncontrado.js';

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(error, req, res, next) {
  if (error instanceof NaoEncontrado) {
    error.enviarResposta(res);
  }

  if (error instanceof mongoose.Error.CastError) {
    new RequisicaoIncorreta().enviarResposta(res);
  }

  if (error instanceof mongoose.Error.ValidationError) {
    error.enviarResposta(res);
  }

  new ErroBase().enviarResposta(res);
}

export default manipuladorDeErros;
