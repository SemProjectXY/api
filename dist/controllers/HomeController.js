"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
  async create(req, res) {
    try {
      console.log(req.body);
      const novoUser = await _User2.default.create(req.body);
      res.status(201).json(novoUser);
    } catch (e) {
      res.status(400).json({
        statusCode: 400,
        errorMessage: e.errors,
      });
    }
  }

  async index(req, res) {
    try {
      const users = await _User2.default.findAll();
      return res.json(users);
    } catch (e) {
      return res.status(400).json(null);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await _User2.default.findByPk(id);
      return res.json(user);
    } catch (e) {
      return res.status(400).json(null);
    }
  }

  async update(req, res) {
    try {
      const user = await _User2.default.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          erro: 'Usuario nao existe',
        });
      }

      const novosDados = await user.update(req.body);

      return res.json(user);
    } catch (e) {
      return res.status(400).json(null);
    }
  }

  async remove(req, res) {
    try {
      const { id } = req.params;

      if (!req.params.id) {
        return res.status(400).json({
          erro: 'Corpo invalido',
        });
      }
      const user = await _User2.default.findByPk(id);

      if (!user) {
        return res.status(400).json({
          erro: 'Usuario nao existe',
        });
      }

      await user.destroy();

      return res.json(user);
    } catch (e) {
      console.log(e);
      return res.status(400).json(null);
    }
  }
}

exports. default = new UserController();
