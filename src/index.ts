import express from 'express';
import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { cleanEnv, str, json } from 'envalid';
import userApi from './api/userApi';
import corsConfig from './config/corsConfig';
var morgan = require('morgan');
var app = express();

const swaggerUi = require('swagger-ui-express');
//const swaggerFile = require('../swagger_output.json');

import dotenv from 'dotenv';
dotenv.config();

function envalidThat() {
  cleanEnv(process.env, {
    ACCESS_TOKEN: str(),
    DATABASE_URL: str(),
  });
}
//validation
envalidThat();

//middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(corsConfig.corsConfig);
app.use(bodyParser.json());

//route
app.use('/user', userApi.router);
//app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

//handler
app.use(function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  response.status(400).send(error.message).end();
  next(error);
});

app.listen(process.env.PORT, () => {
  console.log(
    `🚀 Server ready at: http://localhost:${process.env.PORT}  - powered by SEGO ︻╦╤─ - - -`
  );
});

export {};
