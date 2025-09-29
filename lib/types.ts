export enum StatusCode {
  Ok = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  Conflict = 409,
  InternalServerError = 500,
}

export type ActionsState<T> = {
  code: StatusCode;
  message?: string;
  data?: T;
  error?: Error;
};
