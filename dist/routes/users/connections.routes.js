"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ConnectionsController = _interopRequireDefault(require("../../controllers/ConnectionsController"));

var _middlewares = _interopRequireDefault(require("../../middlewares"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const connectionsRouter = (0, _express.Router)();
const connectionsController = new _ConnectionsController.default();
connectionsRouter.post('/', _middlewares.default, connectionsController.create);
connectionsRouter.get('/', _middlewares.default, connectionsController.index);
var _default = connectionsRouter;
exports.default = _default;