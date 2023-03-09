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

export type IRequestError =
  | IBackendError
  | IFetchError
  | SerializedError
  | undefined;

export interface IUserSignUp {
  name: string;
  login: string;
  password: string;
}

export interface IUserSignIn {
  login: string;
  password: string;
}

export interface IBoardCreate {
  title: string;
  owner: string;
  users: string[];
}

export interface IBoard extends IBoardCreate {
  _id: string;
}

export interface IColumnCreate {
  title: string;
  order: number;
}

export interface IColumn extends IColumnCreate {
  _id: string;
  boardId: string;
}

export interface IGetTasks {
  boardId: string;
  columnId: string;
}

export interface ITaskCreate {
  title: string;
  order: number;
  description: string;
  userId: string;
  users: string[];
}

export interface ITaskUpdate extends ITaskCreate {
  columnId: string;
}

export interface ITask extends ITaskCreate, IGetTasks {
  _id: string;
}

export interface decodeToken {
  exp: number;
  iat: number;
  id: string;
  login: string;
}
