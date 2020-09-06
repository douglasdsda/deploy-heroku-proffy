"use strict";

var _tsyringe = require("tsyringe");

require("../providers");

var _UsersTokenRepository = _interopRequireDefault(require("../repositories/UsersTokenRepository"));

var _SheduleRepository = _interopRequireDefault(require("../repositories/SheduleRepository"));

var _UsersRepository = _interopRequireDefault(require("../repositories/UsersRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('UsersRepository', _UsersRepository.default);

_tsyringe.container.registerSingleton('UsersTokensRepository', _UsersTokenRepository.default);

_tsyringe.container.registerSingleton('SheduleRepository', _SheduleRepository.default);