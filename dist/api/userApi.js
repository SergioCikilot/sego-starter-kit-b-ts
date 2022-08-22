"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
Promise.resolve().then(() => __importStar(require('dotenv/config')));
const userService_1 = __importDefault(require("../service/userService"));
const resultResponse_1 = __importDefault(require("../util/resultResponse"));
router.post('/signUp', (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = request.body;
    try {
        let message = yield userService_1.default.addUser(user);
        resultResponse_1.default.successDataResponse(message, response, 200);
    }
    catch (error) {
        next(error);
    }
}));
router.post('/login', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = request.body;
        const token = yield userService_1.default.loginManager(user);
        resultResponse_1.default.successHeaderResponse({ authorization: token }, response, 200);
    }
    catch (error) {
        resultResponse_1.default.errorResponse(response, 403);
    }
}));
router.get('/findAllUsers', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userService_1.default.findAllUsers();
        resultResponse_1.default.successDataResponse(users, response, 200);
    }
    catch (error) {
        resultResponse_1.default.errorResponse(response, 400);
    }
}));
module.exports = { router };
//# sourceMappingURL=userApi.js.map