import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IBoard, IBoardCreate, IUserSignIn, IUserSignUp } from '../@types/common'
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
    baseUrl: 'https://final-task-backend-production-97a6.up.railway.app/',
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
    })

  }),

})

