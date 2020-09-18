"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ForgotController = _interopRequireDefault(require("../../controllers/ForgotController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const forgotRouter = (0, _express.Router)();
const forgotController = new _ForgotController.default();
forgotRouter.post('/', forgotController.create);
var _default = forgotRouter;
exports.default = _default;