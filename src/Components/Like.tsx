import axios from 'axios';
import { useState, useRef, RefObject } from 'react';
import { cookieErr } from '../util/pageErr';
import star_act from './../icon/star_act.svg';
import star_emt from './../icon/star.svg';
import { useAppSelector } from '../store/store';

const Like = (props: { index: any }) => {
  let storeName = useAppSelector((state) => state.user.name);
  const [star, setStar] = useState(false);
  const starChange = () => {
    setStar(!star);
    axios
      .post(process.env.REACT_APP_ip + '/board/like', {
        name: storeName,
        post_index: props.index,
      })
      .then((res) => {});
  };
  return (
    <>
      <img
        src={star ? star_act : star_emt}
        alt='즐겨찾기 아이콘'
        onClick={starChange}
      />
    </>
  );
};

export default Like;
