import { Response } from "express";

function successDataResponse(data: any, response: Response, status: number) {
  response.send(data).status(status).end();
}

function successHeaderResponse(data: any, response: Response, status: number) {
  response.status(status).header(data).end();
}

function errorResponse(response: Response, status: number) {
  response.status(status).end();
}

function errorDataResponse(
  errorMessage: string,
  response: Response,
  status: number
) {
  response.status(status).send({ message: errorMessage }).end();
}
export = {
  errorDataResponse,
  successDataResponse,
  errorResponse,
  successHeaderResponse,
};
