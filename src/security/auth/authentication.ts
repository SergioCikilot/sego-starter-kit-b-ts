import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { UserType } from "userType";

import dotenv from "dotenv";
dotenv.config({ path: "/Users/sergio/Developer/sego-starter-kit-b-ts/.env" });

function verifyToken(request: any, response: Response, next: NextFunction) {
  if (!request.header("authorization")) {
    return response.status(401).send({ message: "token yok" });
  }

  let token = request.header("authorization").split(" ")[1];

  try {
    let secret = "";
    if (process.env.ACCESS_TOKEN === undefined) {
      console.log("Secret is unfined");
    } else {
      secret = process.env.ACCESS_TOKEN;
    }

    var payload = jwt.verify(token, secret);
    if (!payload) {
      return response.status(401).send({ message: "Not authorized" });
    }
  } catch (error) {
    console.log("Incorrect token");
  }
  next();
}

function signToken(user: UserType, timeString: string) {
  let secret = "";
  if (process.env.ACCESS_TOKEN === undefined) {
    console.log("Secret is unfined");
  } else {
    secret = process.env.ACCESS_TOKEN;
  }
  var token = jwt.sign(user, secret, {
    expiresIn: timeString,
  });
  return token;
}

export = { verifyToken, signToken };
