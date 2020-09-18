"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ShowProviersService = _interopRequireDefault(require("../services/Shedules/ShowProviersService"));

var _DeleteShedulesService = _interopRequireDefault(require("../services/Shedules/DeleteShedulesService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ShedulesController {
  async index(req, res) {
    const filters = req.query;
    const week_day = filters.week_day;
    const subject = filters.subject;
    const time = filters.time;

    const sheduleShowService = _tsyringe.container.resolve(_ShowProviersService.default);

    const show = await sheduleShowService.execute({
      week_day,
      subject,
      time
    });
    return res.json(show);
  }

  async delete(req, res) {
    const {
      id
    } = req.params;

    const deleteSheduleService = _tsyringe.container.resolve(_DeleteShedulesService.default);

    await deleteSheduleService.execute({
      id: Number(id)
    });
    return res.status(204).send();
  }

}

exports.default = ShedulesController;