"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _UpdateProfile = _interopRequireDefault(require("../services/Users/UpdateProfile"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ClassesController {
  async create(req, res) {
    const {
      name,
      email,
      sobrenome,
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    } = req.body;
    const user_id = req.user.id;

    const profile = _tsyringe.container.resolve(_UpdateProfile.default);

    const user = await profile.execute({
      name,
      email,
      sobrenome,
      whatsapp,
      bio,
      subject,
      cost,
      schedule,
      user_id
    });
    return res.json(user);
  }

}

exports.default = ClassesController;