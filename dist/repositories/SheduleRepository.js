"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _convertHourToMinutes = _interopRequireDefault(require("../utils/convertHourToMinutes"));

var _Shedule = _interopRequireDefault(require("../entities/Shedule"));

var _connection = _interopRequireDefault(require("../database/connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SheduleRepository {
  async findByFilter({
    week_day,
    timeMinutos,
    subject
  }) {
    const list = await (0, _connection.default)('classes').whereExists(function () {
      this.select('class_schedule.*').from('class_schedule').whereRaw('`class_schedule`.`class_id` = `classes`.`id`').whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)]).whereRaw('`class_schedule`.`from` <= ??', [timeMinutos]).whereRaw('`class_schedule`.`to` > ??', [timeMinutos]);
    }).where('classes.subject', '=', subject).join('users', 'classes.user_id', '=', 'users.id').select(['classes.*', 'users.*']);
    return list;
  }

  async deleteByClassIdAll(class_id) {
    await (0, _connection.default)('class_schedule').delete('*').where('class_id', '=', class_id);
  }

  async delete(id) {
    await (0, _connection.default)('class_schedule').delete('*').where('id', '=', id);
  }

  async findById(id) {
    const sheduleDB = await (0, _connection.default)('class_schedule').select('*').where('id', '=', id).first();
    const shedule = new _Shedule.default();
    Object.assign(shedule, { ...sheduleDB
    });
    return shedule || undefined;
  }

  async findByClassId(class_id) {
    const shedules = await (0, _connection.default)('class_schedule').select('*').where('class_id', '=', class_id);

    if (shedules.length > 0) {
      shedules.map(item => {
        const shedule = new _Shedule.default();
        Object.assign(shedule, { ...item
        });
        return shedule;
      });
    }

    return shedules || undefined;
  }

  async save(data, class_id) {
    const shedules = data.map(item => {
      const shedule = new _Shedule.default();
      Object.assign(shedule, { ...item,
        from: (0, _convertHourToMinutes.default)(item.from),
        to: (0, _convertHourToMinutes.default)(item.to),
        class_id
      });
      return { ...shedule
      };
    });
    await (0, _connection.default)('class_schedule').insert(shedules);
    return shedules || undefined;
  }

  async update(data) {
    const class_id = data[0].class_id;
    const shedules = data.map(async item => {
      const shedule = new _Shedule.default();
      Object.assign(shedule, { ...item,
        from: (0, _convertHourToMinutes.default)(item.from),
        to: (0, _convertHourToMinutes.default)(item.to),
        class_id
      });
      await (0, _connection.default)('class_schedule').update({ ...shedule
      }).where('id', '=', shedule.id);
      return { ...shedule
      };
    });
    return shedules || undefined;
  }

}

var _default = SheduleRepository;
exports.default = _default;