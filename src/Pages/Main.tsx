import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Modal, Form } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';
import { useState, useRef, RefObject } from 'react';
import { Routes, Route, Link, useNavigate, Outlet, Navigate } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import { useEffect } from 'react';
import { cookieErr } from '../util/pageErr';
import { useAppSelector } from './../store/store';
import { ElTargetBtn, CommentBtn } from './../Components/ShowBtn';
import useIntersectionObserver from './../util/scroll';
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
    position: absolute;
    bottom: 20px;
    right: 20px;
    color: yellow;
  }
`;

const ModalInner = styled.div`
  display: flex;
  word-break: break-all;
  @media screen and (max-width: 991px) {
    flex-direction: column;
    & section:last-child {
      margin-top: 10px;
    }
  }
  & section:first-child {
    flex: 6;
  }
  & section:last-child {
    flex: 4;
    padding-left: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  & section > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    background-color: #ececec;
  }
  & article {
    padding: 0 10px;
    border-bottom: 1px solid #ececec;
  }
`;

const FormControl = styled(Form.Control)`
  width: 100%;
  height: 50px;
  border: none;
  resize: none;
  &:focus {
    outline: none;
  }
`;

const ModalT = styled.article`
  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  & > div > div {
    display: flex;
    align-items: center;
  }

  & img {
    width: calc(1.275rem + 0.3vw);
    height: calc(1.275rem + 0.3vw);
    cursor: pointer;
    margin: 0 5px;
  }
  & p,
  span {
    font-size: 14px;
    color: #888;
  }
  & .name_ud {
    font-size: 16px;
    margin: 10px 0;
  }
  & .name_ud span {
    cursor: pointer;
  }
  & .name_ud span:first-child::after {
    content: '|';
    padding-left: 8px;
  }
  & .name_ud span:last-child {
    padding-left: 8px;
  }
`;

const ModalM = styled.article`
  & > p {
    margin: 10px 0;
  }
  & > p > span {
    font-weight: bold;
    padding-right: 10px;
  }
  & > div {
    display: flex;
    align-items: center;
  }
`;

const ModalCont = styled.article`
  overflow: auto;
  max-height: 30vh;
  min-height: 15vh;
  & > div {
    margin: 20px 0;
  }
  & ul {
    display: block;
    border-top: 1px solid #ececec;
  }
  & ul > li {
    display: flex;
    margin: 20px 0;
  }
  & .comment_writer {
    padding-right: 20px;
    font-weight: bold;
    flex-shrink: 0;
  }
  & .comment_cont > p {
    padding-bottom: 10px;
  }
  & .comment_cont > div > span {
    font-size: 14px;
    color: #888;
    margin-right: 8px;
  }
  & .comment_cont > div > span:not(:first-child) {
    cursor: pointer;
  }
`;

const ModalFt = styled.form`
  display: flex;
  margin: 20px 0 !important;
  border: none !important;
`;

const Main = () => {
  let storeId = useAppSelector((state) => state.user.id);
  let storeName = useAppSelector((state) => state.user.name);
  const [getList, setGetList] = useState([
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
  ]);

  useEffect(() => {
    getLiFunction();
  }, []);

  const getLiFunction = () => {
    axios
      .get(process.env.REACT_APP_ip + '/board')
      .then((res) => {
        setGetList(res.data);
      })
      .catch((e) => {
        cookieErr(e.response.status);
      });
  };

  const [elTarget, setElTarget] = useState({
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

  const [lgShow, setLgShow] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [cmtList, setCmtList] = useState([{ index: '', post_index: '', id: '', name: '', content: '', date: '' }]);
  const comment = useRef() as RefObject<HTMLFormElement>;
  const textarea = useRef() as RefObject<HTMLTextAreaElement>;
  const reviewChk = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.value.length < 3 ? setDisabled(true) : setDisabled(false);
  };

  // 댓글 관련 기능

  const getCmt = (post_index: string) => {
    axios
      .get(process.env.REACT_APP_ip + `/board/comment?index=${post_index}`)
      .then((res) => {
        setCmtList(res.data);
        console.log(res.data);
      })
      .catch((e) => {
        cookieErr(e.response.status);
      });
    console.log(cmtList);
  };

  const submitChk = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDisabled(true);
    axios
      .post(process.env.REACT_APP_ip + '/board/comment', {
        user_id: storeId,
        user_name: storeName,
        post_index: elTarget.index,
        content: textarea.current!.value,
      })
      .then((res) => {
        getCmt(elTarget.index);
      })
      .catch((e) => {
        cookieErr(e.response.status);
      });
    textarea.current!.value = '';
  };

  // 무한스크롤 관련 코드
  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    console.log(`감지결과 : ${isIntersecting}`);
  };

  const { setTarget } = useIntersectionObserver({ onIntersect });

  return (
    <>
      <Modal
        size='xl'
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby='example-modal-sizes-title-lg'
      >
        <Modal.Body>
          <ModalInner>
            <section>
              <img
                src={elTarget.photo_url}
                alt=''
                width='100%'
              />
            </section>
            <section>
              <div>
                <ModalT>
                  <div className='title_like'>
                    <div>
                      <h4>{elTarget.photo_name}</h4>
                      <img
                        src={'./image/star.svg'}
                        alt='즐겨찾기 아이콘'
                      />
                    </div>
                    <p>{elTarget.create_date}</p>
                  </div>
                  <div className='name_ud'>
                    <p>{elTarget.create_user}</p>
                    {/* <div>
                      <span onClick={postUpdate}>수정</span>
                      <span onClick={postDelete}>삭제</span>
                    </div> */}
                    {storeName === elTarget.create_user && (
                      <ElTargetBtn
                        elTarget={elTarget}
                        setLgShow={setLgShow}
                        getLiFunction={getLiFunction}
                      />
                    )}
                  </div>
                </ModalT>
                <ModalM>
                  <p>
                    <span>촬영날짜</span>
                    {elTarget.photo_date}
                  </p>
                  <p>
                    <span>촬영장소</span>
                    {elTarget.photo_place}
                  </p>
                  <p>
                    <span>카메라</span>
                    {elTarget.used_camera}
                  </p>
                  <div>
                    <img
                      src={'/image/' + elTarget.used_film + '.png'}
                      alt='사용 필름 이미지'
                    />
                    <p>{elTarget.used_film !== 'other' ? elTarget.used_film : elTarget.other_film}</p>
                  </div>
                </ModalM>
                <ModalCont>
                  <div>{elTarget.photo_desc}</div>
                  <ul>
                    {cmtList.map((el, i) => {
                      return (
                        <li key={i}>
                          <p className='comment_writer'>{el.name}</p>
                          <div className='comment_cont'>
                            <p>{el.content}</p>
                            <div>
                              <span>{el.date}</span>

                              {/* <span
                                onClick={() => {
                                  cmtDelete(el.index, el.post_index);
                                }}
                              >
                                삭제
                              </span> */}
                              {storeName === el.name && (
                                <CommentBtn
                                  el={el}
                                  getCmt={getCmt}
                                />
                              )}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </ModalCont>
              </div>
              <div>
                <ModalFt ref={comment}>
                  <FormControl
                    ref={textarea}
                    onChange={reviewChk}
                    as='textarea'
                    placeholder='댓글 달기...'
                  ></FormControl>
                  <Button
                    variant='dark'
                    onClick={submitChk}
                    disabled={disabled}
                  >
                    게시
                  </Button>
                </ModalFt>
              </div>
            </section>
          </ModalInner>
        </Modal.Body>
      </Modal>
      <Container>
        <CustomMasonry
          className='my-masonry-grid mt-4'
          columnClassName='my-masonry-grid_column'
          breakpointCols={breakpointColumnsObj}
        >
          {getList.map((el, i) => {
            return (
              <Figure
                onClick={() => {
                  setElTarget(el);
                  getCmt(el.index);
                  setLgShow(true);
                }}
                key={i}
              >
                <img
                  src={el.photo_url}
                  alt='사진'
                />
                <figcaption>{el.photo_date}</figcaption>
              </Figure>
            );
          })}
          <div ref={setTarget}></div>
        </CustomMasonry>
      </Container>
    </>
  );
};

export default Main;
