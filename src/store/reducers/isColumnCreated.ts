import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialState {
  isCreated: boolean;
}

const initialState: InitialState = {
  isCreated: false,
}

const isColumnCreated = createSlice({
  name: 'isColumnCreated',
  initialState,
  reducers: {
    setIsCreated: (state, action: PayloadAction<boolean>) => {
      state.isCreated = action.payload;
    },
  },
});

export const { setIsCreated } = isColumnCreated.actions;

export default isColumnCreated.reducer;