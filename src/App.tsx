import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar, Button, Modal, Form } from "react-bootstrap";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import axios from "axios";
import { useState, useRef } from 'react';
import {Login, Join} from './Pages/LoginJoin';
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Masonry from "react-masonry-css";
import { prototype } from "stream";

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
    &:focus{
        outline: none;
    }
`

const ModalT = styled.article`
    & > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
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
    & > p{
        margin: 10px 0;
    }
    & > p > span{
        font-weight: bold;
        padding-right: 10px;
    }
    & > div{
        display: flex;
        align-items: center;
    }
`;

const ModalCont = styled.article`
    & > p{
        display: block;
        overflow: auto;
        max-height: 15vh;
        min-height: 20px;
        margin: 20px 0;
    }
`;

const ModalLi = styled.article`
    & ul {
        display: block;
        overflow: auto;
        height: 10vh;
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

const ModalFt = styled.article`
    display: flex;
    margin: 20px 0 !important;
    border: none !important;
`;

const Main = () => {
    let navigate = useNavigate();
    const [lgShow, setLgShow] = useState(false);
    return (
        <>
            <Navbar expand="sm" bg="dark" variant="dark" sticky="top">
                <Container className="ps-4 pe-4">
                    <Navbar.Brand
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        OFPE
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        {/* <Nav.Link onClick={()=>{navigate(-1)}}>뒤로가기</Nav.Link> */}
                        {/* <Link className="nav_link" to="/">Home</Link>
                        <Link className="nav_link" to="/detail">Detail</Link> */}
                    </Nav>
                    <Nav>
                        {/* <Nav.Link
                            onClick={() => {
                                navigate("/");
                            }}
                        >
                            박소연
                        </Nav.Link>
                        <Nav.Link disabled>
                            님, 오늘의 사진은 어떠셨나요?
                        </Nav.Link>
                        */}
                        <Button
                            className="ms-3"
                            onClick={() => {
                                navigate("/");
                            }}
                            variant="warning"
                        >
                            찰칵!
                        </Button>
                    </Nav>
                </Container>
            </Navbar>
            <Modal
                size="xl"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
                className="mt-5"
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
                                        <h4>제목</h4>
                                        <p>
                                            업로드날짜
                                            <span>라이크</span>
                                        </p>
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
                                    <p>
                                        내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이내용이
                                    </p>
                                </ModalCont>
                            </div>
                            <div>
                                <ModalLi>
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
                                </ModalLi>
                                <ModalFt>
                                    <FormControl
                                        as="textarea"
                                        placeholder="댓글 달기..."
                                    />
                                    <Button variant="dark" disabled>
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
                    <Figure>
                        <img src="/image/login_bg2.jpg" alt="" />
                        <figcaption>2</figcaption>
                    </Figure>
                    <Figure>
                        <img src="/image/login_bg.jpg" alt="" />
                        <figcaption>3</figcaption>
                    </Figure>
                    <Figure>
                        <img src="/image/login_bg2.jpg" alt="" />
                        <figcaption>4</figcaption>
                    </Figure>
                    <Figure>
                        <img src="/image/login_bg2.jpg" alt="" />
                        <figcaption>5</figcaption>
                    </Figure>
                    <Figure>
                        <img src="/image/login_bg.jpg" alt="" />
                        <figcaption>6</figcaption>
                    </Figure>
                    <Figure>
                        <img src="/image/login_bg.jpg" alt="" />
                        <figcaption>7</figcaption>
                    </Figure>
                    <Figure>
                        <img src="/image/login_bg.jpg" alt="" />
                        <figcaption>8</figcaption>
                    </Figure>
                </CustomMasonry>
            </Container>
        </>
    );
    
}

function App() {

   const [act,SetAct] = useState<boolean | null>(null)

  return (
        <>
            <GlobalStyles />
            {/* <Login/>
            <Join /> */}
            <Main />
            {/* <button
                onClick={() => {
                  SetAct(()=> !act)
                    axios
                        .post("http://localhost:8080/api/test", {
                            firstName: "Fred",
                            lastName: "Flintstone",
                        })
                        .then(function (response) {
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }}
            >
                TEST1
            </button>
            <button
              onClick={() => {
                SetAct(()=> !act)
                  axios
                      .post( ip + "/api/test", {
                          firstName: "Fred",
                          lastName: "Flintstone",
                      })
                      .then(function (response) {
                          console.log(response);
                      })
                      .catch(function (error) {
                          console.log(error);
                      });
              }}
          >
              TEST2
            </button> */}
        </>
  );

}

export default App;
