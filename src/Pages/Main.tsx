import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';
import { useState, useRef, RefObject, useCallback } from 'react';
import Masonry from 'react-masonry-css';
import { useEffect } from 'react';
import { cookieErr } from '../util/pageErr';
import { useAppSelector } from './../store/store';
import { useInView } from 'react-intersection-observer';
import Cards from './../Components/Cards';
import ModalCmp from '../Components/Modal';

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
    position: absolute;
    bottom: 20px;
    right: 20px;
    color: yellow;
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
  let storeId = useAppSelector((state) => state.user.id);
  let storeName = useAppSelector((state) => state.user.name);
  //게시글 전체 data state
  const [getList, setGetList] = useState<List[]>([]);

  //보이는 게시글 data만 들어있는 state
  const [mapList, setMapList] = useState<List[]>([]);

  //게시글 몇 번까지 출력했는지 저장
  const [mapNum, setMapNum] = useState(24);

  // 페이지 접속 시 게시글 가져오기
  useEffect(() => {
    getLiFunction();
  }, []);

  //전체게시글 불러오기
  const getLiFunction = () => {
    axios
      .get(process.env.REACT_APP_ip + '/api/board')
      .then((res) => {
        setGetList(res.data);
        setMapList(res.data.slice(0, 24));
        setMapNum(24);
      })
      .catch((e) => {
        cookieErr(e.response.status);
      });
  };

  //내가 쓴 게시글만 불러오기
  const getMyList = () => {
    axios
      .get(process.env.REACT_APP_ip + `/api/board/my?my=${storeName}`)
      .then((res) => {
        setGetList(res.data);
        setMapList(res.data.slice(0, 24));
        setMapNum(24);
      })
      .catch((e) => {
        cookieErr(e.response.status);
      });
  };

  //좋아요 한 게시글만 불러오기
  const getBookmarkList = () => {
    axios
      .get(process.env.REACT_APP_ip + `/api/board/bookmarks?my=${storeName}`)
      .then((res) => {
        setGetList(res.data);
        setMapList(res.data.slice(0, 24));
        setMapNum(24);
      })
      .catch((e) => {
        cookieErr(e.response.status);
      });
  };

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

  // 무한스크롤 관련 코드
  const mapAdd = () => {
    if (mapNum < getList.length) {
      let a = getList.slice(mapNum, mapNum + 24);
      setMapList(mapList.concat(a));
      setMapNum(mapNum + 24);
    }
  };

  useEffect(() => {
    if (inView && mapNum < getList.length) {
      mapAdd();
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
          getLiFunction={getLiFunction}
          cmtList={cmtList}
          setGetList={setGetList}
          setMapList={setMapList}
          setMapNum={setMapNum}
        />
      )}
      <Container>
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
        <div
          ref={ref}
          className='bottom_chk'
        ></div>
      </Container>
    </>
  );
};

export default Main;
