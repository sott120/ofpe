import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';
import { useState, useRef, RefObject, useCallback } from 'react';
import Masonry from 'react-masonry-css';
import { useEffect } from 'react';
import { cookieErr } from '../util/pageErr';
import { useAppSelector, useAppDispatch } from './../store/store';
import { useInView } from 'react-intersection-observer';
import Cards from './../Components/Cards';
import ModalCmp from '../Components/Modal';
import { GetData, mapAdd } from '../store/postSlice';
import NoList from '../Components/NoList';

const breakpointColumnsObj = {
  default: 4,
  1199: 3,
  830: 2,
  575: 1,
};

const CustomMasonry = styled(Masonry)`
  &.my-masonry-grid {
    display: -webkit-box; /* Not needed if autoprefixing */
    display: -ms-flexbox; /* Not needed if autoprefixing */
    display: flex;
    width: auto;
  }
  &.my-masonry-grid_column {
    /* gutter size */
    background-clip: padding-box;
  }
  & .bottom_chk {
    font-size: 0;
  }
`;

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

export interface commentList {
  index: string;
  post_index: string;
  id: string;
  name: string;
  content: string;
  date: string;
}

const Main = () => {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    rootMargin: '100px',
  });
  const dispatch = useAppDispatch();

  //게시글 전체 data state
  const getList = useAppSelector((state) => state.postSlice.getList);
  //보이는 게시글 data만 들어있는 state
  const mapList = useAppSelector((state) => state.postSlice.mapList);
  //게시글 몇 번까지 출력했는지 저장
  const mapNum = useAppSelector((state) => state.postSlice.mapNum);

  // 페이지 접속 시 게시글 가져오기
  useEffect(() => {
    dispatch(GetData.getPost());
  }, []);

  // 클릭한 현재 게시글
  const [elTarget, setElTarget] = useState<List>({
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
  });

  // 모달창
  const [lgShow, setLgShow] = useState(false);

  // 좋아요 별
  const [star, setStar] = useState(false);

  //버튼 active
  const [disabled, setDisabled] = useState(true);
  // 댓글 리스트
  const [cmtList, setCmtList] = useState<commentList[]>([]);

  const comment = useRef() as RefObject<HTMLFormElement>;
  // 댓글 작성 텍스트박스
  const textarea = useRef() as RefObject<HTMLTextAreaElement>;
  const reviewChk = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.value.length < 3 ? setDisabled(true) : setDisabled(false);
  };

  // 댓글 관련 기능
  const getCmt = (post_index: string) => {
    axios
      .get(process.env.REACT_APP_ip + `/api/board/comment?index=${post_index}`)
      .then((res) => {
        setCmtList(res.data);
        console.log(res.data);
      })
      .catch((e) => {
        cookieErr(e.response.status);
      });
    console.log(cmtList);
  };

  const callbackGetCmt = useCallback((post_index: string) => {
    axios
      .get(process.env.REACT_APP_ip + `/api/board/comment?index=${post_index}`)
      .then((res) => {
        setCmtList(res.data);
        console.log(res.data);
      })
      .catch((e) => {
        cookieErr(e.response.status);
      });
    console.log(cmtList);
  }, []);

  useEffect(() => {
    //무한스크롤
    if (inView && mapNum < getList.length) {
      dispatch(mapAdd());
    }
  }, [inView]);
  return (
    <>
      {lgShow && (
        <ModalCmp
          elTarget={elTarget}
          lgShow={lgShow}
          setLgShow={setLgShow}
          star={star}
          setStar={setStar}
          disabled={disabled}
          setDisabled={setDisabled}
          getCmt={getCmt}
          cmtList={cmtList}
        />
      )}
      <Container>
        {getList[0].index === '' ? (
          <NoList />
        ) : (
          <CustomMasonry
            className='my-masonry-grid mt-4'
            columnClassName='my-masonry-grid_column'
            breakpointCols={breakpointColumnsObj}
          >
            {mapList.map((el, i) => {
              return (
                <Cards
                  setElTarget={setElTarget}
                  // getCmt={getCmt}
                  getCmt={callbackGetCmt}
                  setLgShow={setLgShow}
                  setDisabled={setDisabled}
                  key={i}
                  el={el}
                  setStar={setStar}
                />
              );
            })}
          </CustomMasonry>
        )}
        <div
          ref={ref}
          className='bottom_chk'
        ></div>
      </Container>
    </>
  );
};

export default Main;
