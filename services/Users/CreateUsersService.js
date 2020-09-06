"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = require("bcryptjs");

var _tsyringe = require("tsyringe");

var _AppErros = _interopRequireDefault(require("../../errors/AppErros"));

var _IUsersRepository = _interopRequireDefault(require("../../interfaces/IUsersRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateUsersService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateUsersService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({
    name,
    email,
    password,
    sobrenome
  }) {
    const checkUsersExists = await this.usersRepository.findByEmail(email);

    if (checkUsersExists) {
      throw new _AppErros.default('Email addres alredy used');
    }

    const hashedPassword = await (0, _bcryptjs.hash)(password, 8);
    const user = await this.usersRepository.save({
      name,
      email,
      password: hashedPassword,
      sobrenome
    }); // console.log("user: ", JSON.stringify(user));

    return user;
  }

}) || _class) || _class) || _class) || _class);
var _default = CreateUsersService;
exports.default = _default;