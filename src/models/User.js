import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultVaue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'A nome deve ter entre 3 a 255 caracteries',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultVaue: '',
        unique: {
          msg: 'Email ja existe',
        },
        validate: {
          isEmail: {
            msg: 'Email deve ser valido',
          },
        },
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultVaue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
        defaultVaue: '',
        validate: {
          len: {
            args: [6, 50],
            msg: 'A senha deve ter entre 6 a 50 caracteries',
          },
        },
      },
    }, { sequelize });

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        try {
          user.password_hash = await bcryptjs.hashSync(user.password, 8);
        } catch (e) {
          console.log(e);
        }
      }
    });

    return this;
  }

  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}
