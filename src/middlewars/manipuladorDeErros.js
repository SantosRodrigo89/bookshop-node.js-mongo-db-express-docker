import mongoose from 'mongoose';

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(error, req, res, next) {
  if (error instanceof mongoose.Error.CastError) {
    res
      .status(400)
      .send({ message: 'Um ou mais dados específicos estão incorretos' });
  }
  
  res
    .status(500)
    .json({ message: `${error.message} - falha na requisição` });
}

export default manipuladorDeErros;
