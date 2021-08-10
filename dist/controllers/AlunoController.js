"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _Foto = require('../models/Foto'); var _Foto2 = _interopRequireDefault(_Foto);

class AlunoController {
  async index(req, res) {
    const aluno = await _Aluno2.default.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
      order: [['id', 'DESC'], [_Foto2.default, 'id', 'DESC']],
      include: {
        model: _Foto2.default,
        attributes: ['filename'],
      },
    });
    return res.json(aluno);
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await _Aluno2.default.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [_Foto2.default, 'id', 'DESC']],
        include: {
          model: _Foto2.default,
          attributes: ['url', 'filename'],
        },
      });
      return res.json(user);
    } catch (e) {
      return res.status(400).json(null);
    }
  }

  async create(req, res) {
    try {
      const aluno = await _Aluno2.default.create(req.body);
      return res.json({ aluno });
    } catch (e) {
      return res.status(400).json({
        erros: e.errors[0].message,
      });
    }
  }

  async update(req, res) {
    const { id } = req.params;

    try {
      const user = await _Aluno2.default.findByPk(id);

      if (!user) {
        return res.status(400).json({
          erros: 'Nao existe',
        });
      }

      const novosDados = await user.update(req.body);

      return res.json(novosDados);
    } catch (e) {
      return res.status(400).json({
        erros: e.errors,
      });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const user = await _Aluno2.default.findByPk(id);

      if (!user) {
        return res.status(400).json({
          erros: 'Nao existe',
        });
      }

      const novosDados = await user.destroy();

      return res.json(novosDados);
    } catch (e) {
      return res.status(400).json({
        erros: e.errors,
      });
    }
  }
}

exports. default = new AlunoController();
/* const novoUser = await User.create(req.body);

const users = await User.findAll();

const user = await User.findByPk(id);

const novosDados = await user.update(req.body);

await user.destroy(); */
