"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _middlewares = _interopRequireDefault(require("../../middlewares"));

var _ClassesController = _interopRequireDefault(require("../../controllers/ClassesController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const classesRouter = (0, _express.Router)();
const classesController = new _ClassesController.default();
classesRouter.post('/', _middlewares.default, classesController.create);
classesRouter.get('/', _middlewares.default, classesController.index);
classesRouter.put('/', _middlewares.default, classesController.update);
var _default = classesRouter;
exports.default = _default;