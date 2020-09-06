"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UserToken = _interopRequireDefault(require("../entities/UserToken"));

var _connection = _interopRequireDefault(require("../database/connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersTokensRepository {
  async findByToken(token) {
    const userTokenDB = await (0, _connection.default)('users_tokens').select('*').where('token', '=', token).first();
    const userToken = new _UserToken.default();
    Object.assign(userToken, { ...userTokenDB
    });
    return userToken || undefined;
  }

  async deleteByUserId(user_id) {
    await (0, _connection.default)('users_tokens').delete('*').where('user_id', '=', user_id);
  }

  async findById(id) {
    const userTokenDB = await (0, _connection.default)('users_tokens').select('*').where('id', '=', id).first();
    const userToken = new _UserToken.default();
    Object.assign(userToken, { ...userTokenDB
    });
    return userToken || undefined;
  }

  async findByUserId(user_id) {
    const userTokenDB = await (0, _connection.default)('users_tokens').select('*').where('user_id', '=', user_id).first();
    const userToken = new _UserToken.default();
    Object.assign(userToken, { ...userTokenDB
    });
    return userToken || undefined;
  }

  async save(userToken) {
    await (0, _connection.default)('users_tokens').insert(userToken);
    return userToken.hash;
  }

  async update(updateUserDTO) {
    if (updateUserDTO && updateUserDTO.user_id) {
      await (0, _connection.default)('users_tokens').update({
        token: updateUserDTO.hash
      }).where('user_id', '=', updateUserDTO.user_id);
    }
  }

}

var _default = UsersTokensRepository;
exports.default = _default;