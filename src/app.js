import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { resolve } from 'path';
import homeRoutes from './routes/homeRoutes';
import tokenRoutes from './routes/homeToken';
import alunoRoutes from './routes/alunoRoutes';
import fotoRoutes from './routes/fotoRoutes';
import './database';

dotenv.config();

const whiteList = [
  'https://www.apiescola.ga/',
  'http://localhost:3001',
];

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    // this.app.use(corsOptions);
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
