import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { api } from '../services/api'
import appReducer from './reducers/appSlice';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  app: appReducer,
})

export const setupStore = () =>{
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(api.middleware)
    }
  })
}

export const store = setupStore()

export type RootState = ReturnType<typeof store.getState>; 
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']