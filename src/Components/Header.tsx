import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';
import { useState, useRef } from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import { prototype } from 'stream';
import { useAppSelector } from './../store/store';

const Navwrap = styled(Navbar)`
  min-height: 54px;
`;

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

const Navbtns = styled(Nav)`
  flex-direction: row;
  align-items: center;
  & Button:last-child {
    margin-left: 16px;
  }
  @media screen and (max-width: 991px) {
    font-size: 14px;
    & Button {
      font-size: 14px;
    }
    & Button:first-child {
      color: #888;
    }
    & Button:last-child {
      margin-left: 10px;
    }
  }
`;

const Name = styled.div`
  color: #fff;
  margin-right: 16px;
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const NavLogo = styled.img``;

const Header = () => {
  let storeName = useAppSelector((state) => state.user.name);

  let navigate = useNavigate();
  const logOut = () => {
    if (window.confirm('로그아웃 하시겠습니까?') === true) {
      axios.get(process.env.REACT_APP_ip + '/api/logout').then((res) => {
        window.location.replace('/login');
      });
    } else {
      return;
    }
  };
  return (
    <Navwrap
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
        <Navbtns>
          <Name>{storeName}님 반갑습니다!</Name>
          <Button
            onClick={logOut}
            variant='outline-secondary'
          >
            로그아웃
          </Button>
          <Button
            onClick={() => {
              navigate('/write');
            }}
            variant='warning'
          >
            전시하기
          </Button>
        </Navbtns>
      </Container>
    </Navwrap>
  );
};

export default Header;
