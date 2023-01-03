import { createSlice } from '@reduxjs/toolkit';

interface Num {
  number: number;
}

const initialState: Num = {
  number: 1,
};

export const filterNum = createSlice({
  name: 'filterNum',
  initialState,
  reducers: {
    setNumber(state, action) {
      state.number = action.payload;
    },
  },
  extraReducers: {},
});
export const { setNumber } = filterNum.actions;

export default filterNum.reducer;
