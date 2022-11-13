import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar, Button} from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
import { useState, useRef } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Masonry from "react-masonry-css";
import { prototype } from "stream";

const Header = () => {
    let navigate = useNavigate();
    return (
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