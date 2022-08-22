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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function createUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.user.create({
            data: data,
        });
        return console.log(`User with usernamee ${data.username} added`);
    });
}
function findAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.user.findMany({});
        return user;
    });
}
function findUserByUserName(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.user.findUnique({
            where: {
                username: data.username,
            },
        });
        if (!user) {
            let message = { message: 'Email or password invaldi' };
            return message;
        }
        return user;
    });
}
module.exports = { createUser, findAllUsers, findUserByUserName };
//# sourceMappingURL=userDao.js.map