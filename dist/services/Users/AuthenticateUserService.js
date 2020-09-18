"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _jsonwebtoken = require("jsonwebtoken");

var _AppErros = _interopRequireDefault(require("../../errors/AppErros"));

var _IUsersRepository = _interopRequireDefault(require("../../interfaces/IUsersRepository"));

var _IHashProvider = _interopRequireDefault(require("../../providers/HashProvider/models/IHashProvider"));

var _auth = _interopRequireDefault(require("../../config/auth"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let AuthenticateUserService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('HashProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default, typeof _IHashProvider.default === "undefined" ? Object : _IHashProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class AuthenticateUserService {
  constructor(usersRepository, hashProvider) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
  }

  async execute({
    email,
    password
  }) {
    var _user$id;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new _AppErros.default('Email not exists.', 401);
    }

    const passwordVerited = await this.hashProvider.compareHash(password, user.password);

    if (!passwordVerited) {
      throw new _AppErros.default('Invalid password or email', 401);
    }

    const {
      secret,
      expiresIn
    } = _auth.default.jwt;
    if (user.avatar) user.avatar_url = `${process.env.APP_API_URL}/files/${user.avatar}`;
    const token = (0, _jsonwebtoken.sign)({}, secret, {
      subject: user === null || user === void 0 ? void 0 : (_user$id = user.id) === null || _user$id === void 0 ? void 0 : _user$id.toString(),
      expiresIn
    });
    return {
      user,
      token
    };
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = AuthenticateUserService;
exports.default = _default;