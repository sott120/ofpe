import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import userSlice from './userSlice';
// type stateType = {
//   user: { id: string; name: string };
// };

// const initialState: stateType = {
//   user: { id: '', name: '' },
// };

// export const userLogin = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     setUser(state: stateType, action) {
//       state.user.id = action.payload.id;
//       state.user.name = action.payload.name;
//     },
//   },
//   extraReducers: {},
// });
// export const { setUser } = userLogin.actions;

// export default userLogin.reducer;

export const store = configureStore({
  reducer: userSlice,
});

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
