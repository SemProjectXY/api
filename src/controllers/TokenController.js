import jwt from 'jsonwebtoken';
import User from '../models/User';

require('dotenv').config();

class TokenController {
  async index(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) return res.json('Credenciais invalida');

    const user = await User.findOne({ where: { email } });

    if (!user) return res.json('Usuario nao existe');

    if (!await user.passwordIsValid(password)) return res.json('Senha invalida');

    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({ token });
  }
}

export default new TokenController();
