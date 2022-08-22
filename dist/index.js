"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
const envalid_1 = require("envalid");
const userApi_1 = __importDefault(require("./api/userApi"));
const corsConfig_1 = __importDefault(require("./config/corsConfig"));
var morgan = require('morgan');
var app = (0, express_1.default)();
const swaggerUi = require('swagger-ui-express');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function envalidThat() {
    (0, envalid_1.cleanEnv)(process.env, {
        ACCESS_TOKEN: (0, envalid_1.str)(),
        DATABASE_URL: (0, envalid_1.str)(),
    });
}
envalidThat();
app.use((0, helmet_1.default)());
app.use(morgan('combined'));
app.use(corsConfig_1.default.corsConfig);
app.use(body_parser_1.default.json());
app.use('/user', userApi_1.default.router);
app.use(function errorHandler(error, request, response, next) {
    response.status(400).send(error.message).end();
    next(error);
});
app.listen(process.env.PORT, () => {
    console.log(`🚀 Server ready at: http://localhost:${process.env.PORT}  - powered by SEGO ︻╦╤─ - - -`);
});
//# sourceMappingURL=index.js.map