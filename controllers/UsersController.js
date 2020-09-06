"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateUsersService = _interopRequireDefault(require("../services/Users/CreateUsersService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersController {
  async create(req, res) {
    const {
      name,
      sobrenome,
      email,
      password
    } = req.body;

    const createUser = _tsyringe.container.resolve(_CreateUsersService.default);

    const user = await createUser.execute({
      name,
      sobrenome,
      email,
      password
    });
    return res.json(user);
  }

}

exports.default = UsersController;