"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IShedulesRepository = _interopRequireDefault(require("../../interfaces/IShedulesRepository"));

var _AppErros = _interopRequireDefault(require("../../errors/AppErros"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let DeleteShedulesService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('SheduleRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IShedulesRepository.default === "undefined" ? Object : _IShedulesRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class DeleteShedulesService {
  constructor(shedulesRepository) {
    this.shedulesRepository = shedulesRepository;
  }

  async execute({
    id
  }) {
    const shedule = await this.shedulesRepository.findById(id);

    if (shedule && shedule.id) {
      this.shedulesRepository.delete(id);
    } else {
      throw new _AppErros.default('Shedule item not exists');
    }
  }

}) || _class) || _class) || _class) || _class);
var _default = DeleteShedulesService;
exports.default = _default;