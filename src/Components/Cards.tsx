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
    position: absolute;
    bottom: 20px;
    right: 20px;
    color: yellow;
  }
`;

const Cards = React.memo((props: any) => {
  let storeName = useAppSelector((state) => state.user.name);
  const getLike = () => {
    axios
      .get(process.env.REACT_APP_ip + `/board/like?index=${props.el.index}&name=${storeName}`)
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
