import { configureStore } from '@reduxjs/toolkit'

export const setupStore = () =>{
  return configureStore({
    reducer: {}
  })
}

const store = setupStore()

export type RootState = ReturnType<typeof store.getState>; 
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']