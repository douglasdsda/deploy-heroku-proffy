"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _convertHourToMinutes = _interopRequireDefault(require("../utils/convertHourToMinutes"));

var _Classes = _interopRequireDefault(require("../entities/Classes"));

var _connection = _interopRequireDefault(require("../database/connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ClassesRepository {
  async findById(id) {
    const classesDB = await (0, _connection.default)('classes').select('*').where('id', '=', id).first();
    const classes = new _Classes.default();
    Object.assign(classes, { ...classesDB
    });
    return classes || undefined;
  }

  async findPagination({
    from,
    subject,
    to,
    week_day
  }) {
    const timeFrom = (0, _convertHourToMinutes.default)(String(from));
    const timeTo = (0, _convertHourToMinutes.default)(String(to));
    const search = await (0, _connection.default)('classes').whereExists(function () {
      this.select('class_schedule.*').from('class_schedule').whereRaw('`class_schedule`.`class_id` = `classes`.`id`').where('week_day', 'like', week_day || '%').where('from', '>=', from ? from !== 'null' ? timeFrom : 0 : 0).where('to', '<=', to ? to !== 'null' ? timeTo : 1440 : 1440);
    }).join('users', 'users.id', '=', 'user_id').select('*').where('subject', 'like', subject || '%');
    return search;
  }

  async findByUserId(id) {
    const classesDB = await (0, _connection.default)('classes').select('*').where('user_id', '=', id).first();
    const classes = new _Classes.default();
    Object.assign(classes, { ...classesDB
    });
    return classes || undefined;
  }

  async save(data) {
    const id = await (0, _connection.default)('classes').insert(data);
    const classes = new _Classes.default();
    Object.assign(classes, { ...data,
      id: id[0]
    });
    return { ...classes
    } || undefined;
  }

  async update({
    cost,
    subject,
    user_id,
    id
  }) {
    await (0, _connection.default)('classes').update({
      id,
      subject,
      cost,
      user_id
    }).where('user_id', '=', user_id);
    const classes = new _Classes.default();
    Object.assign(classes, {
      cost,
      subject,
      user_id,
      id
    });
    return classes;
  }

}

var _default = ClassesRepository;
exports.default = _default;