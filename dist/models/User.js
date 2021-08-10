"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

 class User extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: _sequelize2.default.STRING,
        defaultVaue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'A nome deve ter entre 3 a 255 caracteries',
          },
        },
      },
      email: {
        type: _sequelize2.default.STRING,
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
        type: _sequelize2.default.STRING,
        defaultVaue: '',
      },
      password: {
        type: _sequelize2.default.VIRTUAL,
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
          user.password_hash = await _bcryptjs2.default.hashSync(user.password, 8);
        } catch (e) {
          console.log(e);
        }
      }
    });

    return this;
  }

  passwordIsValid(password) {
    return _bcryptjs2.default.compare(password, this.password_hash);
  }
} exports.default = User;
