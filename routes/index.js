"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _users = _interopRequireDefault(require("./users/users.routes"));

var _sessions = _interopRequireDefault(require("./users/sessions.routes"));

var _forgot = _interopRequireDefault(require("./users/forgot.routes"));

var _connections = _interopRequireDefault(require("./users/connections.routes"));

var _classes = _interopRequireDefault(require("./users/classes.routes"));

var _resetPassword = _interopRequireDefault(require("./users/resetPassword.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.use('/users', _users.default);
routes.use('/sessions', _sessions.default);
routes.use('/forgot', _forgot.default);
routes.use('/reset', _resetPassword.default);
routes.use('/connections', _connections.default);
routes.use('/classes', _classes.default);
var _default = routes;
exports.default = _default;