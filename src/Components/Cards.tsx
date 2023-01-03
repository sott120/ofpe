import axios from 'axios';
import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../store/store';
import { cookieErr } from '../util/pageErr';

const Figure = styled.div`
  cursor: pointer;
  border-radius: 10px;
  overflow: hidden;
  margin: 10px;
  margin-bottom: 20px;
  position: relative;
  & img {
    width: 100%;
  }
  & figcaption {
    font-family: digital;
    font-size: 18px;
    letter-spacing: 2px;
    position: absolute;
    bottom: 20px;
    right: 20px;
    color: #ffdf27df;
    text-shadow: 0 0 2px #ff7300, 0 0 3px #703200d3;
  }
`;

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

interface CardInterface {
  setElTarget: React.Dispatch<
    React.SetStateAction<{
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
    }>
  >;
  getCmt: (post_index: string) => void;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setLgShow: React.Dispatch<React.SetStateAction<boolean>>;
  el: List;
  setStar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Cards = React.memo((props: CardInterface) => {
  let storeName = useAppSelector((state) => state.userSlice.user.name);
  const getLike = () => {
    axios
      .get(process.env.REACT_APP_ip + `/api/board/like?index=${props.el.index}&name=${storeName}`)
      .then((res) => {
        if (res.data.length === 1) {
          props.setStar(true);
        } else {
          props.setStar(false);
        }
      })
      .catch((e) => {
        cookieErr(e.response.status);
      });
  };

  return (
    <Figure
      onClick={() => {
        props.setElTarget(props.el);
        props.getCmt(props.el.index);
        props.setLgShow(true);
        props.setDisabled(true);
        getLike();
      }}
    >
      <img
        src={props.el.photo_url}
        alt='사진'
      />
      <figcaption>{props.el.photo_date}</figcaption>
    </Figure>
  );
});

export default Cards;
