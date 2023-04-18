import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const TOKEN_AUTH_LOCALSTORAGE = 'kanban-token';

export type IStateApp = {
  token: string | null;
  id: string | null;
};

export const initialState: IStateApp = {
  token: localStorage.getItem('TOKEN_AUTH_LOCALSTORAGE') || null,
  id: null,
};

const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.id = action.payload
    }
  },
});

export const { setToken, setUserId } = app.actions;

export default app.reducer;