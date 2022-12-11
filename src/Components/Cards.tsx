import React from 'react';
import styled from 'styled-components';

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
  return (
    <Figure
      onClick={() => {
        props.setElTarget(props.el);
        props.getCmt(props.el.index);
        props.setLgShow(true);
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
