"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _UpdateFormService = _interopRequireDefault(require("../services/Users/UpdateFormService"));

var _ProfileShow = _interopRequireDefault(require("../services/Users/ProfileShow"));

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
      schedule,
      avatar
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
      user_id,
      avatar
    });
    return res.json(user);
  }

  async update(req, res) {
    const {
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    } = req.body;
    const user_id = req.user.id;

    const updateFormService = _tsyringe.container.resolve(_UpdateFormService.default);

    const user = await updateFormService.execute({
      whatsapp,
      bio,
      subject,
      cost,
      schedule,
      user_id
    });
    return res.json(user);
  }

  async index(req, res) {
    const user_id = req.user.id;
    const {
      id
    } = req.query;

    const profileShow = _tsyringe.container.resolve(_ProfileShow.default);

    const userClassesShedule = await profileShow.execute({
      user_id: Number(id) || user_id
    });
    return res.json(userClassesShedule);
  }

}

exports.default = ClassesController;