"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _UpdateUserAvatarService = _interopRequireDefault(require("../services/Users/UpdateUserAvatarService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserAvatarController {
  async update(request, response) {
    const updateUserAvatarService = _tsyringe.container.resolve(_UpdateUserAvatarService.default);

    const user = await updateUserAvatarService.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename
    });
    return response.json(user);
  }

}

exports.default = UserAvatarController;