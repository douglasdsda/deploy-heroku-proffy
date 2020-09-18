"use strict";

var _tsyringe = require("tsyringe");

var _BCryptHashProvider = _interopRequireDefault(require("./HashProvider/implementations/BCryptHashProvider"));

var _DiskStorageProvider = _interopRequireDefault(require("./StorageProvider/implementations/DiskStorageProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('HashProvider', _BCryptHashProvider.default);

_tsyringe.container.registerSingleton('StorageProvider', _DiskStorageProvider.default);