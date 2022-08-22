"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "/Users/sergio/Developer/sego-starter-kit-b-ts/.env" });
function verifyToken(request, response, next) {
    if (!request.header("authorization")) {
        return response.status(401).send({ message: "token yok" });
    }
    let token = request.header("authorization").split(" ")[1];
    try {
        let secret = "";
        if (process.env.ACCESS_TOKEN === undefined) {
            console.log("Secret is unfined");
        }
        else {
            secret = process.env.ACCESS_TOKEN;
        }
        var payload = jsonwebtoken_1.default.verify(token, secret);
        if (!payload) {
            return response.status(401).send({ message: "Not authorized" });
        }
    }
    catch (error) {
        console.log("Incorrect token");
    }
    next();
}
function signToken(user, timeString) {
    let secret = "";
    if (process.env.ACCESS_TOKEN === undefined) {
        console.log("Secret is unfined");
    }
    else {
        secret = process.env.ACCESS_TOKEN;
    }
    var token = jsonwebtoken_1.default.sign(user, secret, {
        expiresIn: timeString,
    });
    return token;
}
module.exports = { verifyToken, signToken };
//# sourceMappingURL=authentication.js.map