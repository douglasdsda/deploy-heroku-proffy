"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ResetPasswordController = _interopRequireDefault(require("../../controllers/ResetPasswordController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const resetPasswordRouter = (0, _express.Router)();
const resetPasswordController = new _ResetPasswordController.default();
resetPasswordRouter.post('/', resetPasswordController.create);
var _default = resetPasswordRouter;
exports.default = _default;