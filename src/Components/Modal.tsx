import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';
import { useState, useRef, RefObject, Key } from 'react';
import { cookieErr } from '../util/pageErr';
import { useAppSelector } from './../store/store';
import { ElTargetBtn, CommentBtn } from './../Components/ShowBtn';
import Like from './../Components/Like';

const ModalBox = styled(Modal)`
  .main_modal {
    min-width: 1278px;
  }
  .modal-header {
    display: none;
  }
  @media screen and (max-width: 1399px) {
    .main_modal {
      min-width: 1100px;
    }
  }
  @media screen and (max-width: 1199px) {
    .main_modal {
      min-width: 918px;
    }
  }
  @media screen and (max-width: 991px) {
    .main_modal {
      min-width: 678px;
    }
  }
  @media screen and (max-width: 767px) {
    .main_modal {
      min-width: 486px;
    }
  }
  @media screen and (max-width: 575px) {
    .main_modal {
      min-width: 300px;
    }
    .modal-header {
      display: flex;
      background-color: #fff;
      position: sticky;
      top: -16px;
    }
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
    flex: 3;
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
  & .name_ud > p:hover {
    text-decoration: underline;
    cursor: pointer;
    color: #333;
  }
  & .name_ud span:hover {
    cursor: pointer;
    color: #333;
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
    font-weight: 500;
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
    white-space: pre-line;
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
    font-weight: 500;
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

const ModalCmp = ({
  elTarget,
  lgShow,
  setLgShow,
  star,
  setStar,
  disabled,
  setDisabled,
  getCmt,
  getLiFunction,
  cmtList,
}: any) => {
  let storeId = useAppSelector((state) => state.user.id);
  let storeName = useAppSelector((state) => state.user.name);

  //모달창 전체화면
  const [fullscreen, setFullscreen] = useState('sm-down');

  const comment = useRef() as RefObject<HTMLFormElement>;
  // 댓글 작성 텍스트박스
  const textarea = useRef() as RefObject<HTMLTextAreaElement>;
  const reviewChk = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.value.length < 2 ? setDisabled(true) : setDisabled(false);
  };

  const submitChk = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDisabled(true);
    axios
      .post(process.env.REACT_APP_ip + '/api/board/comment', {
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

  return (
    <ModalBox
      show={lgShow}
      onHide={() => setLgShow(false)}
      aria-labelledby='example-modal-sizes-title-lg'
      centered
      dialogClassName='main_modal'
      fullscreen={fullscreen}
    >
      <Modal.Body>
        <Modal.Header closeButton />
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
                    <Like
                      index={elTarget.index}
                      star={star}
                      setStar={setStar}
                    />
                  </div>
                  <p>{elTarget.create_date}</p>
                </div>
                <div className='name_ud'>
                  <p>{elTarget.create_user}</p>
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
                  {cmtList.map(
                    (
                      el: { name?: any; content?: any; date?: any; index?: string | undefined; post_index?: string },
                      i: Key | null | undefined,
                    ) => {
                      return (
                        <li key={i}>
                          <p className='comment_writer'>{el.name}</p>
                          <div className='comment_cont'>
                            <p>{el.content}</p>
                            <div>
                              <span>{el.date}</span>
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
                    },
                  )}
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
                  maxLength={200}
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
    </ModalBox>
  );
};

export default ModalCmp;
