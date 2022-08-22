import { NextFunction, Request, Response, Router } from 'express';
import { UserType } from 'userType';

import express from 'express';
var router = express.Router();
import('dotenv/config');

import userService from '../service/userService';
import responses from '../util/resultResponse';
import authentication from '../security/auth/authentication';

router.post(
  '/signUp',
  async (request: Request, response: Response, next: NextFunction) => {
    let user: UserType = request.body;

    try {
      let message = await userService.addUser(user);

      responses.successDataResponse(message, response, 200);
    } catch (error) {
      next(error);
      //responses.errorDataResponse("User cannot be added", response, 400);
    }
  }
);

router.post('/login', async (request: Request, response: Response) => {
  try {
    let user: UserType = request.body;
    const token = await userService.loginManager(user);

    responses.successHeaderResponse({ authorization: token }, response, 200);
  } catch (error) {
    responses.errorResponse(response, 403);
  }
});

router.get(
  '/findAllUsers',
  //authentication.verifyToken,

  async (request: Request, response: Response) => {
    try {
      const users: UserType[] = await userService.findAllUsers();

      responses.successDataResponse(users, response, 200);
    } catch (error) {
      responses.errorResponse(response, 400);
    }
  }
);

export = { router };
