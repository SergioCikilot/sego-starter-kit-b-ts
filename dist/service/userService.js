"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
require('dotenv').config();
const bcryptHasher_1 = __importDefault(require("../security/bcryptHasher"));
const userDao_1 = __importDefault(require("../data/userDao"));
const authentication_1 = __importDefault(require("../security/auth/authentication"));
const dateFinder = new Date();
const dateNow = () => {
    let day = dateFinder.getDate();
    let month = dateFinder.getMonth() + 1;
    let year = dateFinder.getFullYear();
    return `${year}-${month}-${day}`;
};
function addUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        let hashedPassword = bcryptHasher_1.default.hash(data.password);
        data.password = hashedPassword;
        data['date'] = dateNow();
        const message = yield userDao_1.default.createUser(data);
        return message;
    });
}
function findAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield userDao_1.default.findAllUsers();
        return users;
    });
}
function findUserByUserName(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield userDao_1.default.findUserByUserName(data);
        return user;
    });
}
function loginManager(data) {
    return __awaiter(this, void 0, void 0, function* () {
        let isAuthenticated = false;
        const user = yield userDao_1.default.findUserByUserName(data);
        if (!user) {
            return user;
        }
        var token = authentication_1.default.signToken(user, '1h');
        return 'Bearer ' + token;
    });
}
module.exports = { addUser, findAllUsers, findUserByUserName, loginManager };
//# sourceMappingURL=userService.js.map