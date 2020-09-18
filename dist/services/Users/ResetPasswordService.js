"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = require("bcryptjs");

var _tsyringe = require("tsyringe");

var _dateFns = require("date-fns");

var _AppErros = _interopRequireDefault(require("../../errors/AppErros"));

var _IUsersRepository = _interopRequireDefault(require("../../interfaces/IUsersRepository"));

var _IUsersTokensRepository = _interopRequireDefault(require("../../interfaces/IUsersTokensRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ResetPasswordService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UsersTokensRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default, typeof _IUsersTokensRepository.default === "undefined" ? Object : _IUsersTokensRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ResetPasswordService {
  constructor(usersRepository, usersTokensRepository) {
    this.usersRepository = usersRepository;
    this.usersTokensRepository = usersTokensRepository;
  }

  async execute({
    password,
    token
  }) {
    const userToken = await this.usersTokensRepository.findByToken(token);

    if (!userToken) {
      throw new _AppErros.default('User  token does not exists');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new _AppErros.default('User does not exists');
    }

    const tokenCreated = userToken.created_at;
    const compareDate = (0, _dateFns.addHours)(new Date(tokenCreated), 2);

    if ((0, _dateFns.isAfter)(Date.now(), compareDate)) {
      throw new _AppErros.default('Token expired.');
    }

    const hashedPassword = await (0, _bcryptjs.hash)(password, 8);
    user.password = hashedPassword;
    await this.usersRepository.update({ ...user
    });
    await this.usersTokensRepository.deleteByUserId(user.id);
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = ResetPasswordService;
exports.default = _default;