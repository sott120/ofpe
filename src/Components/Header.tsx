import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';
import { useState, useRef } from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import { prototype } from 'stream';
import { useAppSelector } from './../store/store';

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
    content: 'OFPE';
    margin-left: 10px;
    position: absolute;
    top: 17px;
  }
  & div > img {
    width: 100%;
    height: 100%;
  }
`;

const NavLogo = styled.img``;

const Header = () => {
  let id = useAppSelector((state) => state.user.id);

  let navigate = useNavigate();
  const logOut = () => {
    if (window.confirm('로그아웃 하시겠습니까?') === true) {
      axios.get(process.env.REACT_APP_ip + '/logout').then((res) => {
        window.location.replace('/login');
      });
    } else {
      return;
    }
  };
  return (
    <Navbar
      expand='sm'
      bg='dark'
      variant='dark'
      sticky='top'
    >
      <Container className='ps-4 pe-4'>
        <NavbarBrand
          onClick={() => {
            navigate('/');
          }}
        >
          <div>
            <img
              src={process.env.PUBLIC_URL + '/image/ofpe_logo.png'}
              alt='헤더 로고'
            />
          </div>
        </NavbarBrand>
        <Nav>
          <Nav.Link onClick={logOut}>로그아웃</Nav.Link>
          <Button
            className='ms-3'
            onClick={() => {
              navigate('/write');
            }}
            variant='warning'
          >
            전시하기
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
