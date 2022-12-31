import { createSlice } from '@reduxjs/toolkit';
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
    //로그인하면 실행되는 함수
    setUser(state: stateType, action) {
      console.log(action);
      state.user.id = action.payload[0].id;
      state.user.name = action.payload[0].name;
    },
    //새로고침할때 실행되는 함수
    replaceUser(state: stateType, action) {
      console.log(action);
      state.user.id = action.payload.id;
      state.user.name = action.payload.name;
    },
  },
  extraReducers: {},
});
export const { setUser, replaceUser } = userLogin.actions;

export default userLogin.reducer;
