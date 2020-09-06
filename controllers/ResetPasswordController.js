"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = require("bcryptjs");

var _dateFns = require("date-fns");

var _connection = _interopRequireDefault(require("../database/connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ResetPasswordController {
  async create(req, res) {
    const {
      token,
      new_password
    } = req.body;

    try {
      const userToken = await (0, _connection.default)('users_tokens').select('*').where('token', '=', token).first();

      if (userToken) {
        const tokenCreated = userToken.created_at;
        const compareDate = (0, _dateFns.addHours)(tokenCreated, 2);

        if ((0, _dateFns.isAfter)(Date.now(), compareDate)) {
          return res.status(401).json({
            error: 'token ixpired.'
          });
        }

        const {
          user_id
        } = userToken;
        const passwordhash = await (0, _bcryptjs.hash)(new_password, 8);
        await (0, _connection.default)('users').where('id', '=', user_id).update({
          password: passwordhash
        });
        await (0, _connection.default)('users_tokens').delete('*').where('user_id', '=', user_id);
        return res.status(200).json({
          status: 'OK'
        });
      }

      return res.status(400).json({
        error: 'token is invalid, token used.'
      });
    } catch (err) {
      return res.status(400).json({
        error: 'Internal server error.'
      });
    }
  }

}

exports.default = ResetPasswordController;