import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import userSlice from './userSlice';
import postSlice from './postSlice';
import filterNumSlice from './filterNumSlice';

export const store = configureStore({
  reducer: { userSlice, postSlice, filterNumSlice },
});

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
