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
    height: 80vh;
    & section:first-child {
        flex: 6;
    }
    & section:last-child {
        flex: 4;
        padding-left: 10px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content:space-between;
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
    & > div{
        display: flex;
    }
`

const ModalM = styled.article``;

const ModalCont = styled.article``;

const ModalLi = styled.article``;

const ModalFt = styled.article`

`

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
                                        <span>업로드날짜</span>
                                        <span>like</span>
                                    </div>
                                    <p>이름</p>
                                </ModalT>
                                <ModalM>
                                    <p>촬영날짜</p>
                                    <p>장소</p>
                                    <div>
                                        <img src="/image/null.png" alt="" />
                                    </div>
                                </ModalM>
                                <ModalCont>
                                    내용이 적혀있습니다아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ
                                </ModalCont>
                            </div>
                            <div>
                                <ModalLi>
                                    <ul>
                                        <li>
                                            <p>닉네임</p>
                                            <p>댓글 내용</p>
                                        </li>
                                        <li>
                                            <p>닉네임</p>
                                            <p>댓글 내용</p>
                                        </li>
                                        <li>
                                            <p>닉네임</p>
                                            <p>댓글 내용</p>
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
