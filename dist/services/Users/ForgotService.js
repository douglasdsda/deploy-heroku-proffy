"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = require("bcryptjs");

var _tsyringe = require("tsyringe");

var _ProviderEmail = _interopRequireDefault(require("../ProviderEmail"));

var _AppErros = _interopRequireDefault(require("../../errors/AppErros"));

var _IUsersRepository = _interopRequireDefault(require("../../interfaces/IUsersRepository"));

var _IUsersTokensRepository = _interopRequireDefault(require("../../interfaces/IUsersTokensRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ForgotService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UsersTokensRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default, typeof _IUsersTokensRepository.default === "undefined" ? Object : _IUsersTokensRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ForgotService {
  constructor(usersRepository, usersTokensRepository) {
    this.usersRepository = usersRepository;
    this.usersTokensRepository = usersTokensRepository;
  }

  async execute({
    email
  }) {
    const findUser = await this.usersRepository.findByEmail(email);

    if (!findUser) {
      throw new _AppErros.default('Email addres invalid');
    }

    const hashedEmail = await (0, _bcryptjs.hash)(email, 8);
    const findUsersTokens = await this.usersTokensRepository.findByUserId(findUser.id);

    if (findUsersTokens && findUsersTokens.id) {
      await this.usersTokensRepository.update({
        user_id: findUser.id,
        token: hashedEmail
      });
    } else {
      await this.usersTokensRepository.save({
        token: hashedEmail,
        user_id: findUser.id
      });
    }

    await (0, _ProviderEmail.default)(email, hashedEmail).catch(err => {
      console.log('error: ', err);
      throw new _AppErros.default('Send email error.');
    });
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = ForgotService;
exports.default = _default;