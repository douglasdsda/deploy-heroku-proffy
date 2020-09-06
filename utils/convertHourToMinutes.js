"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = convertHourToMinutes;

function convertHourToMinutes(time) {
  const [hour, minutes] = time.split(':').map(Number);
  const timeInMinutes = hour * 60 + minutes;
  return timeInMinutes;
}