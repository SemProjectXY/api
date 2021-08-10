import Sequelize, { Model } from 'sequelize';

export default class Aluno extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'A nome deve ter entre 3 a 255 caracteries',
          },
        },
      },
      sobrenome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'A Sobrenome deve ter entre 3 a 255 caracteries',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'Email ja existe',
        },
        validate: {
          isEmail: {
            msg: 'Email deve ser valido',
          },
        },
      },
      idade: {
        type: Sequelize.INTEGER,
        defaultValue: '',
      },
      peso: {
        type: Sequelize.FLOAT,
        defaultValue: '',
      },
      altura: {
        type: Sequelize.FLOAT,
        defaultValue: '',
      },
    }, { sequelize });
  }

  static associate(models) {
    this.hasMany(models.Foto, { foreignKey: 'aluno_id' });
  }
}
