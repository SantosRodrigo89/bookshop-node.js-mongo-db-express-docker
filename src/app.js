import express from 'express';
import databaseConnect from './config/dbConnect.js';
import routes from './routes/index.js';
import manipuladorDeErros from './middlewars/manipuladorDeErros.js';

const connection = await databaseConnect();

connection.on('error', (err) => {
  console.error('connection error', err);
});

connection.once('open', () => {
  console.log('connection success');
});

const app = express();
routes(app);

app.use(manipuladorDeErros);

export default app;
