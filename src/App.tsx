import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar, Button, Row, Col } from "react-bootstrap";
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
    767: 2,
    500: 1,
};

const CustomMasonry = styled(Masonry)`
    margin-top: 1.5rem;
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
    padding: 10px;
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



const Main = () => {
    let navigate = useNavigate();
    return (
        <>
            <Navbar expand="sm" bg="dark" variant="dark" sticky="top">
                <Container>
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
            <Container>
                <CustomMasonry
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                    breakpointCols={breakpointColumnsObj}
                >
                    <Figure>
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
