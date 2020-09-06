"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ForgotService = _interopRequireDefault(require("../services/Users/ForgotService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ForgotController {
  async create(req, res) {
    const {
      email
    } = req.body;

    const forgot = _tsyringe.container.resolve(_ForgotService.default);

    await forgot.execute({
      email
    });
    return res.status(201).send();
  }

}

exports.default = ForgotController;