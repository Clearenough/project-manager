import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IUserSignIn, IUserSignUp } from '../@types/common'
import { RootState } from '../store/store';

const Endpoints = {
  users: 'users',
  signin: 'signin',
  signup: 'signup',
  boards: 'boards',
  columns: 'columns',
  tasks: 'tasks',
}


export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['User', 'Board', 'Task', 'Column'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://immense-mountain-16315.herokuapp.com/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).app.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    signUp: build.mutation<{id: string}, IUserSignUp>({
      query: (body: IUserSignUp) => ({ 
        url: Endpoints.signup,
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),

    signIn: build.mutation<{token: string}, IUserSignIn>({
      query: (body: IUserSignIn) => ({ 
        url: Endpoints.signin,
        method: 'POST',
        body
      })
    })
  }),

})

