"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
function hash(password) {
    return bcrypt_1.default.hashSync(password, saltRounds);
}
module.exports = { hash };
//# sourceMappingURL=bcryptHasher.js.map