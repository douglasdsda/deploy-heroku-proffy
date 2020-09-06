"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Shedule = _interopRequireDefault(require("../entities/Shedule"));

var _connection = _interopRequireDefault(require("../database/connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SheduleRepository {
  async findById(id) {
    const sheduleDB = await (0, _connection.default)('class_schedule').select('*').where('id', '=', id).first();
    const shedule = new _Shedule.default();
    Object.assign(shedule, { ...sheduleDB
    });
    return shedule || undefined;
  }

  async findByClassId(class_id) {
    const shedules = await (0, _connection.default)('class_schedule').select('*').where('class_id', '=', class_id);
    shedules.map(item => {
      const shedule = new _Shedule.default();
      Object.assign(shedule, { ...item
      });
      return shedule;
    });
    return shedules || undefined;
  }

  async save(data) {
    const shedules = data.map(item => {
      const shedule = new _Shedule.default();
      Object.assign(shedule, { ...item
      });
      return shedule;
    });
    await (0, _connection.default)('class_schedule').insert(shedules);
    return shedules || undefined;
  }

  async update(data) {
    const class_id = data[0].class_id;
    const shedules = data.map(item => {
      const shedule = new _Shedule.default();
      Object.assign(shedule, { ...item
      });
      return shedule;
    });
    await (0, _connection.default)('class_schedule').update({
      shedules
    }).where('class_id', '=', class_id);
    return shedules || undefined;
  }

}

var _default = SheduleRepository;
exports.default = _default;