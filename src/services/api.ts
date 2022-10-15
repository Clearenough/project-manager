import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IUserSignIn, IUserSignUp } from '../@types/common'

const Endpoints = {
  users: 'users',
  signin: 'signin',
  singup: 'singup',
  boards: 'boards',
  columns: 'columns',
  tasks: 'tasks',
}


export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: 'https://nameless-fjord-67107.herokuapp.com/'}),
  endpoints: (build) => ({
    signUp: build.mutation<{id: string}, IUserSignUp>({
      query: (body: IUserSignUp) => ({ 
        url: Endpoints.singup,
        method: 'POST',
        body
      })
    })
  })
})

