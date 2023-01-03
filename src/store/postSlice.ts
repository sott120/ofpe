import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { cookieErr } from '../util/pageErr';

interface List {
  index: string;
  create_date: string;
  create_user: string;
  photo_url: string;
  photo_name: string;
  photo_date: string;
  photo_place: string;
  used_camera: string;
  used_film: string;
  other_film: string;
  photo_desc: string;
}
interface initialInterface {
  getList: List[];
  mapList: List[];
  mapNum: number;
  pageMessage: string;
}

const initialState: initialInterface = {
  getList: [
    {
      index: '',
      create_date: '',
      create_user: '',
      photo_url: '',
      photo_name: '',
      photo_date: '',
      photo_place: '',
      used_camera: '',
      used_film: '',
      other_film: '',
      photo_desc: '',
    },
  ],
  mapList: [
    {
      index: '',
      create_date: '',
      create_user: '',
      photo_url: '',
      photo_name: '',
      photo_date: '',
      photo_place: '',
      used_camera: '',
      used_film: '',
      other_film: '',
      photo_desc: '',
    },
  ],
  mapNum: 24,
  pageMessage: '게시글이 없습니다;(',
};

export const GetData = {
  getPost: createAsyncThunk('getList/data', async () => {
    const result = await axios
      .get(process.env.REACT_APP_ip + '/api/board')
      .then((res) => res.data)
      .catch((e) => {
        cookieErr(e.response.status);
      });

    return result;
  }),

  getMy: createAsyncThunk('getList/mydata', async (storeName: string) => {
    const result = await axios
      .get(process.env.REACT_APP_ip + `/api/board/my?my=${storeName}`)
      .then((res) => res.data)
      .catch((e) => {
        cookieErr(e.response.status);
      });

    return result;
  }),
  getBookmark: createAsyncThunk('getList/bookmarkdata', async (storeName: string) => {
    const result = await axios
      .get(process.env.REACT_APP_ip + `/api/board/bookmarks?my=${storeName}`)
      .then((res) => res.data)
      .catch((e) => {
        cookieErr(e.response.status);
      });

    return result;
  }),
};

export const getList = createSlice({
  name: 'getList',
  initialState,
  reducers: {
    mapAdd(state) {
      let a = state.getList.slice(state.mapNum, state.mapNum + 24);
      state.mapList = state.mapList.concat(a);
      state.mapNum = state.mapNum + 24;
    },
    mapChange(state, actions) {
      state.getList = actions.payload;
      state.mapList = actions.payload.slice(0, 24);
      state.mapNum = 24;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetData.getPost.pending, (state, actions) => {
        state.pageMessage = '로딩중...';
      })
      .addCase(GetData.getPost.fulfilled, (state, actions) => {
        state.getList = actions.payload;
        state.mapList = actions.payload.slice(0, 24);
        state.mapNum = 24;
        state.pageMessage = '게시글이 없습니다;(';
      })
      .addCase(GetData.getMy.fulfilled, (state, actions) => {
        state.getList = actions.payload;
        state.mapList = actions.payload.slice(0, 24);
        state.mapNum = 24;
        console.log(actions.payload);
      })
      .addCase(GetData.getBookmark.fulfilled, (state, actions) => {
        state.getList = actions.payload;
        state.mapList = actions.payload.slice(0, 24);
        state.mapNum = 24;
        console.log(actions.payload);
      });
  },
});

export const { mapAdd, mapChange } = getList.actions;

export default getList.reducer;
