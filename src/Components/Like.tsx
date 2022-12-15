import axios from 'axios';
import { useState, useRef, RefObject } from 'react';
import { cookieErr } from '../util/pageErr';
import star_act from './../icon/star_act.svg';
import star_emt from './../icon/star.svg';
import { useAppSelector } from '../store/store';

const Like = (props: { index: any; setStar: (arg0: boolean) => void; star: any }) => {
  let storeName = useAppSelector((state) => state.user.name);

  const insertLike = () => {
    axios
      .post(process.env.REACT_APP_ip + '/api/board/like', {
        name: storeName,
        post_index: props.index,
      })
      .then((res) => {
        props.setStar(true);
      })
      .catch((e) => {
        cookieErr(e.response.status);
        console.error(e);
      });
  };

  const deleteLike = () => {
    axios
      .delete(process.env.REACT_APP_ip + `/api/board/like?index=${props.index}&name=${storeName}`)
      .then((res) => {
        props.setStar(false);
      })
      .catch((e) => {
        cookieErr(e.response.status);
        console.error(e);
      });
  };

  const starChange = () => {
    if (props.star) {
      deleteLike();
    } else {
      insertLike();
    }
  };

  return (
    <>
      <img
        src={props.star ? star_act : star_emt}
        alt='즐겨찾기 아이콘'
        onClick={starChange}
      />
    </>
  );
};

export default Like;
