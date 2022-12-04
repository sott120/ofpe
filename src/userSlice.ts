import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
type stateType = {
  user: { id: string; name: string };
};

const initialState: stateType = {
  user: { id: '', name: '' },
};

export const userLogin = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state: stateType, action) {
      console.log(action);
      state.user.id = action.payload[0].id;
      state.user.name = action.payload[0].name;
    },
  },
  extraReducers: {},
});
export const { setUser } = userLogin.actions;

export default userLogin.reducer;
