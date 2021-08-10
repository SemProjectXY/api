import dotenv from 'dotenv';
import express from 'express';
import { resolve } from 'path';
import homeRoutes from './routes/homeRoutes';
import tokenRoutes from './routes/homeToken';
import alunoRoutes from './routes/alunoRoutes';
import fotoRoutes from './routes/fotoRoutes';
import './database';

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static(resolve(__dirname, 'uploads')));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/users/', homeRoutes);
    this.app.use('/token/', tokenRoutes);
    this.app.use('/aluno/', alunoRoutes);
    this.app.use('/fotos/', fotoRoutes);
  }
}

export default new App().app;
