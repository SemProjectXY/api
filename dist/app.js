"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _path = require('path');
var _homeRoutes = require('./routes/homeRoutes'); var _homeRoutes2 = _interopRequireDefault(_homeRoutes);
var _homeToken = require('./routes/homeToken'); var _homeToken2 = _interopRequireDefault(_homeToken);
var _alunoRoutes = require('./routes/alunoRoutes'); var _alunoRoutes2 = _interopRequireDefault(_alunoRoutes);
var _fotoRoutes = require('./routes/fotoRoutes'); var _fotoRoutes2 = _interopRequireDefault(_fotoRoutes);
require('./database');

_dotenv2.default.config();

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
    this.app = _express2.default.call(void 0, );
    this.middlewares();
    this.routes();
  }

  middlewares() {
    // this.app.use(corsOptions);
    this.app.use(_express2.default.urlencoded({ extended: true }));
    this.app.use(_express2.default.static(_path.resolve.call(void 0, __dirname, 'uploads')));
    this.app.use(_express2.default.json());
  }

  routes() {
    this.app.use('/users/', _homeRoutes2.default);
    this.app.use('/token/', _homeToken2.default);
    this.app.use('/aluno/', _alunoRoutes2.default);
    this.app.use('/fotos/', _fotoRoutes2.default);
  }
}

exports. default = new App().app;
