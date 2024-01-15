import mongoose from 'mongoose';

mongoose.Schema.Types.String.set('validate', {
  validator: (valor) => valor !== '',
  message: 'Um campo em branco foi fornecido.',
});
