"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _connection = _interopRequireDefault(require("../database/connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ConnectionsController {
  async index(req, res) {
    const connections = await (0, _connection.default)('connections').select('*');
    return res.status(200).json({
      total: connections.length,
      connections
    });
  }

  async create(req, res) {
    const {
      user_id
    } = req.body;
    await (0, _connection.default)('connections').insert({
      user_id
    });
    return res.status(201).send();
  }

}

exports.default = ConnectionsController;