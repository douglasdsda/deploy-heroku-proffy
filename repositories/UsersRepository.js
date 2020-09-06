"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("../entities/User"));

var _connection = _interopRequireDefault(require("../database/connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersRepository {
  constructor() {}

  async findByEmail(email) {
    const userDB = await (0, _connection.default)('users').select('*').where('email', '=', email).first();
    let user;

    if (userDB) {
      user = new _User.default();
      Object.assign(user, { ...userDB
      });
    }

    return user || undefined;
  }

  async findById(id) {
    const userDB = await (0, _connection.default)('users').select('*').where('id', '=', id).first();
    const user = new _User.default();
    Object.assign(user, { ...userDB
    });
    return user || undefined;
  }

  async save(user) {
    const userDBId = await (0, _connection.default)('users').insert(user);
    user.id = userDBId[0];
    return user || undefined;
  }

}

var _default = UsersRepository;
exports.default = _default;