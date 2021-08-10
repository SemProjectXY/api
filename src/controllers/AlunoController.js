import Aluno from '../models/Aluno';
import Foto from '../models/Foto';

class AlunoController {
  async index(req, res) {
    const aluno = await Aluno.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
      order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
      include: {
        model: Foto,
        attributes: ['filename'],
      },
    });
    return res.json(aluno);
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await Aluno.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
        include: {
          model: Foto,
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
      const aluno = await Aluno.create(req.body);
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
      const user = await Aluno.findByPk(id);

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
      const user = await Aluno.findByPk(id);

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

export default new AlunoController();
/* const novoUser = await User.create(req.body);

const users = await User.findAll();

const user = await User.findByPk(id);

const novosDados = await user.update(req.body);

await user.destroy(); */
