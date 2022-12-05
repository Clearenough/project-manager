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



export interface IColumnCreate {
  boardId: string
  title: string,
  order: number,
}
0
export interface IColumn extends IColumnCreate {
  _id: string
}


export interface ITaskCreate {
  boardId: string,
  columnId: string,
  title: string,
  order: number,
  description: string,
  userId: string,
  users: string[]
}

export interface ITask extends ITaskCreate {
  _id: string,
}