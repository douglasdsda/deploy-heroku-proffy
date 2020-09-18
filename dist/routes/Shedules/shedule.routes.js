"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ShedulesController = _interopRequireDefault(require("../../controllers/ShedulesController"));

var _middlewares = _interopRequireDefault(require("../../middlewares"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sheduleRouter = (0, _express.Router)();
const shedulesController = new _ShedulesController.default();
sheduleRouter.delete('/:id', _middlewares.default, shedulesController.delete);
sheduleRouter.get('/', _middlewares.default, shedulesController.index);
var _default = sheduleRouter;
exports.default = _default;