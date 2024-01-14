import express from 'express';
import databaseConnect from './config/dbConnect.js';
import routes from './routes/index.js';

const connection = await databaseConnect();

connection.on('error', (err) => {
  console.error('connection error', err);
});

connection.once('open', () => {
  console.log('connection success');
});

const app = express();
routes(app);

// eslint-disable-next-line no-unused-vars
app.use((erro, req, res, next)=> {
  res.status(500).send({message: 'Erro interno servidor'});
});

export default app;
