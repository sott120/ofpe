import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button, Modal, Form } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
import { useState, useRef } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Masonry from "react-masonry-css";


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
    & h4 {
    }
    & img {
        width: calc(1.275rem + 0.3vw);
        height: calc(1.275rem + 0.3vw);
        cursor: pointer;
        margin: 0 5px;
    }
    & p {
        font-size: 14px;
        color: #888;
    }
    & > p {
        font-size: 16px;
        margin: 10px 0;
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
    }
    & .comment_cont > p {
        padding-bottom: 10px;
    }
    & .comment_cont > span {
        font-size: 14px;
        color: #888;
    }
`;

const ModalFt = styled.form`
    display: flex;
    margin: 20px 0 !important;
    border: none !important;
`;

const Main = () => {
    const [lgShow, setLgShow] = useState(false);
    const [disabled,setDisabled] = useState(true);
    const reviewChk = (e:any) => {
        e.target.value.length < 3 ? setDisabled(true) : setDisabled(false);
    };
    return (
        <>
            {/* <Header/> */}
            <Modal
                size="xl"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Body>
                    <ModalInner>
                        <section>
                            <img
                                src="/image/login_bg.jpg"
                                alt=""
                                width="100%"
                            />
                        </section>
                        <section>
                            <div>
                                <ModalT>
                                    <div>
                                        <div>
                                            <h4>제목</h4>
                                            <img
                                                src={"./image/star.svg"}
                                                alt="즐겨찾기 아이콘"
                                            />
                                        </div>
                                        <p>업로드날짜</p>
                                    </div>
                                    <p>이름</p>
                                </ModalT>
                                <ModalM>
                                    <p>
                                        <span>촬영날짜</span>
                                        2022.11.11
                                    </p>
                                    <p>
                                        <span>촬영장소</span>
                                        성수연방
                                    </p>
                                    <p>
                                        <span>카메라</span>
                                        도란나
                                    </p>
                                    <div>
                                        <img src="/image/buam.png" alt="" />
                                        <p>Buam64</p>
                                    </div>
                                </ModalM>
                                <ModalCont>
                                    <div>
                                        내용이내용이내용이내용이내용이내용이
                                    </div>
                                    <ul>
                                        <li>
                                            <p className="comment_writer">
                                                닉네임
                                            </p>
                                            <div className="comment_cont">
                                                <p>댓글 내용</p>
                                                <span>2022.11.11</span>
                                            </div>
                                        </li>
                                        <li>
                                            <p className="comment_writer">
                                                닉네임
                                            </p>
                                            <div className="comment_cont">
                                                <p>댓글 내용</p>
                                                <span>2022.11.11</span>
                                            </div>
                                        </li>
                                        <li>
                                            <p className="comment_writer">
                                                닉네임
                                            </p>
                                            <div className="comment_cont">
                                                <p>댓글 내용</p>
                                                <span>2022.11.11</span>
                                            </div>
                                        </li>
                                    </ul>
                                </ModalCont>
                            </div>
                            <div>
                                <ModalFt>
                                    <FormControl
                                        onChange={reviewChk}
                                        as="textarea"
                                        placeholder="댓글 달기..."
                                    />
                                    <Button variant="dark" disabled={disabled}>
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
                    className="my-masonry-grid mt-4"
                    columnClassName="my-masonry-grid_column"
                    breakpointCols={breakpointColumnsObj}
                >
                    <Figure onClick={() => setLgShow(true)}>
                        <img src="/image/login_bg.jpg" alt="" />
                        <figcaption>1번</figcaption>
                    </Figure>
                </CustomMasonry>
            </Container>
        </>
    );
};

export default Main;