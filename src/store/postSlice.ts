import { createSlice } from '@reduxjs/toolkit';

export interface List {
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
