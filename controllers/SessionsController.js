"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AuthenticateUserService = _interopRequireDefault(require("../services/Users/AuthenticateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SessionsController {
  async create(req, res) {
    const {
      email,
      password
    } = req.body;

    const auth = _tsyringe.container.resolve(_AuthenticateUserService.default);

    const user = await auth.execute({
      email,
      password
    });
    return res.json(user);
  }

}

exports.default = SessionsController;