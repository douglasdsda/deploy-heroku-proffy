"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppErros = _interopRequireDefault(require("../../errors/AppErros"));

var _convertHourToMinutes = _interopRequireDefault(require("../../utils/convertHourToMinutes"));

var _IShedulesRepository = _interopRequireDefault(require("../../interfaces/IShedulesRepository"));

var _IClassesRepository = _interopRequireDefault(require("../../interfaces/IClassesRepository"));

var _IUsersRepository = _interopRequireDefault(require("../../interfaces/IUsersRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ShowProviersService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('classesRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('SheduleRepository')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default, typeof _IClassesRepository.default === "undefined" ? Object : _IClassesRepository.default, typeof _IShedulesRepository.default === "undefined" ? Object : _IShedulesRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class ShowProviersService {
  constructor(usersRepository, classesRepository, shedulesRepository) {
    this.usersRepository = usersRepository;
    this.classesRepository = classesRepository;
    this.shedulesRepository = shedulesRepository;
  }

  async execute({
    week_day,
    subject,
    time
  }) {
    const timeMinutos = (0, _convertHourToMinutes.default)(time);

    if (!week_day || !subject || !time) {
      throw new _AppErros.default('filter invalid.');
    }

    const list = await this.shedulesRepository.findByFilter({
      subject,
      timeMinutos,
      week_day
    });
    return list;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
var _default = ShowProviersService;
exports.default = _default;