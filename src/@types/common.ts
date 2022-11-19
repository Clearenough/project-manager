import { SerializedError } from "@reduxjs/toolkit";

interface IBackendError {
  status: number;
  data: {
    statusCode: number;
    message: string;
  };
}

interface IFetchError {
  status: string;
  error: string;
}

export type IRequestError = IBackendError | IFetchError | SerializedError | undefined;

export interface IUserSignUp {
  name: string,
  login: string,
  password: string,
}



export interface IUserSignIn {
  login: string,
  password: string,
}

export interface IBoardCreate {
  title: string,
  owner: string,
  users: string[],
}

export interface IBoard extends IBoardCreate {
  _id: string
}
