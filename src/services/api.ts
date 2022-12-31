import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IBoard, IBoardCreate, IColumn, IColumnCreate, IGetTasks, ITask, ITaskCreate, IUserSignIn, IUserSignUp } from '../@types/common'
import { RootState } from '../store/store';

const Endpoints = {
  users: 'users',
  signin: 'auth/signin',
  signup: 'auth/signup',
  boards: 'boards',
  columns: 'columns',
  tasks: 'tasks',
}


export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['User', 'Board', 'Task', 'Column'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ea-at1o.onrender.com/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).app.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    signUp: build.mutation<{ id: string }, IUserSignUp>({
      query: (body: IUserSignUp) => ({
        url: Endpoints.signup,
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),

    signIn: build.mutation<{ token: string }, IUserSignIn>({
      query: (body: IUserSignIn) => ({
        url: Endpoints.signin,
        method: 'POST',
        body
      })
    }),

    //boards

    getAllBoards: build.query<IBoard[], void>({
      query: () => ({
        url: Endpoints.boards,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ _id }) => ({ type: 'Board' as const, _id })),
            { type: 'Board', id: 'LIST' },
          ]
          : [{ type: 'Board', id: 'LIST' }],
    }),

    getBoardByID: build.query<IBoard, string>({
      query: (id: string) => ({
        url: `${Endpoints.boards}/${id}`,
        method: 'GET',
      }),
      providesTags: [{ type: 'Board', id: 'LIST' }],
    }),

    createBoard: build.mutation<IBoard, IBoardCreate>({
      query: (body: IBoardCreate) => ({
        url: Endpoints.boards,
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: 'Board', id: 'LIST' }],
    }),

    deleteBoard: build.mutation<IBoard, string>({
      query: (body: string) => ({
        url: `${Endpoints.boards}/${body}`,
        method: 'DELETE',
        body
      }),
      invalidatesTags: [{ type: 'Board', id: 'LIST' }],
    }),

    updateBoard: build.mutation<IBoard, { body: IBoardCreate, id: string }>({
      query: ({ body, id }) => ({
        url: `${Endpoints.boards}/${id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: [{ type: 'Board', id: 'LIST' }],
    }),

    //Columns

    getAllColumns: build.query<IColumn[], string>({
      query: (boardId: string) => ({
        url: `${Endpoints.boards}/${boardId}/${Endpoints.columns}`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ _id }) => ({ type: 'Column' as const, _id })),
            { type: 'Column', id: 'LIST' },
          ]
          : [{ type: 'Column', id: 'LIST' }],
    }),

    getColumnById: build.query<IColumn, IColumn>({
      query: (body: IColumn) => ({
        url: `${Endpoints.boards}/${body}/${Endpoints.columns}/${body._id}`,
        method: 'GET',
      }),
      providesTags: [{ type: 'Column', id: 'LIST' }],
    }),

    createColumn: build.mutation<IColumn, { body: IColumnCreate, id: string }>({
      query: ({ body, id }) => ({
        url: `${Endpoints.boards}/${id}/${Endpoints.columns}`,
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: 'Column', id: 'LIST' }],
    }),

    updateColumn: build.mutation<IColumn, IColumn>({
      query: (body: IColumn) => ({
        url: `${Endpoints.boards}/${body.boardId}/${Endpoints.columns}/${body._id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: [{ type: 'Column', id: 'LIST' }],
    }),

    deleteColumn: build.mutation<IColumn, IColumn>({
      query: (body: IColumn) => ({
        url: `${Endpoints.boards}/${body.boardId}/${Endpoints.columns}/${body._id}`,
        method: 'DELETE',
        body
      })
    }),


    //Tasks

    getAllTasks: build.query<ITask[], IGetTasks>({
      query: (body: IGetTasks) => ({
        url: `${Endpoints.boards}/${body.boardId}/${Endpoints.columns}/${body.columnId}/${Endpoints.tasks}`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ _id }) => ({ type: 'Task' as const, _id })),
            { type: 'Task', id: 'LIST' },
          ]
          : [{ type: 'Task', id: 'LIST' }],
    }),

    getTaskById: build.query<ITask, ITask>({
      query: (body: ITask) => ({
        url: `${Endpoints.boards}/${body.boardId}/${Endpoints.columns}/${body.columnId}/${Endpoints.tasks}/${body._id}`,
        method: 'GET',
      }),
      providesTags: [{ type: 'Task', id: 'LIST' }],
    }),

    createTask: build.mutation<ITask, { body: ITaskCreate, boardId: string, columnId: string }>({
      query: ({ body, boardId, columnId }) => ({
        url: `${Endpoints.boards}/${boardId}/${Endpoints.columns}/${columnId}/${Endpoints.tasks}`,
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: 'Task', id: 'LIST' }],
    }),

    updateTask: build.mutation<ITask, ITask>({
      query: (body: ITask) => ({
        url: `${Endpoints.boards}/${body.boardId}/${Endpoints.columns}/${body.columnId}/${Endpoints.tasks}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: [{ type: 'Task', id: 'LIST' }],
    }),

    deleteTask: build.mutation<ITask, ITask>({
      query: (body: ITask) => ({
        url: `${Endpoints.boards}/${body.boardId}/${Endpoints.columns}/${body.columnId}/${Endpoints.tasks}`,
        method: 'DELETE',
        body
      })
    }),

  }),

})

