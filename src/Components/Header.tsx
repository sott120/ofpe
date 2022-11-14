import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar, Button} from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
import { useState, useRef } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Masonry from "react-masonry-css";
import { prototype } from "stream";

const NavbarBrand = styled(Navbar.Brand)`
    cursor: pointer;
    position: relative;
    & div {
        position: absolute;
        width: 54px;
        height: 54px;
        top: -22px;
        left: 0;
    }
    & div::after {
        content: "OFPE";
        margin-left: 10px;
        position: absolute;
        top: 17px;
    }
    & div > img {
        width: 100%;
        height: 100%;
    }
`;

const NavLogo = styled.img`
    
`

const Header = () => {
    let navigate = useNavigate();
    return (
        <Navbar expand="sm" bg="dark" variant="dark" sticky="top">
            <Container className="ps-4 pe-4">
                <NavbarBrand
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    <div>
                        <img src="./image/ofpe_logo.png" alt="" />
                    </div>
                </NavbarBrand>
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
                            navigate("/write");
                        }}
                        variant="warning"
                    >
                        전시하기
                    </Button>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;