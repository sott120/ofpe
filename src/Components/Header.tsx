import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import { useAppSelector } from './../store/store';
import { Cookies } from 'react-cookie';
import filter from './../icon/filter.svg';
import filter_act from './../icon/filter_act.svg';
import { useState } from 'react';

const cookies = new Cookies();

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
  @media screen and (max-width: 767px) {
    & div::after {
      content: '';
    }
  }
`;

const Navbtns = styled(Nav)`
  flex-direction: row;
  align-items: center;
  & .write {
    margin-left: 16px;
  }
  @media screen and (max-width: 991px) {
    font-size: 14px;
    & Button {
      font-size: 14px;
    }
    & .logout {
      color: #888;
    }
    & .write {
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

const Filter = styled.div`
  position: relative;
  height: 30px;
  width: 30px;
  cursor: pointer;
  & ul {
    position: absolute;
    top: 42px;
    left: 0px;
    width: 88px;
    background-color: #6c757d;
    color: #fff;
  }
  & ul > li {
    padding: 10px;
    cursor: pointer;
  }
  & ul > li:hover {
    text-decoration: underline;
  }
  & ul > li.active {
    background-color: #000;
  }
  margin-left: 10px;
  @media screen and (max-width: 991px) {
    margin-left: 6px;
    & ul {
      left: auto;
      right: -24px;
      width: 80px;
    }
  }
`;

const Header = () => {
  let storeName = useAppSelector((state) => state.user.name);
  const [filterBtn, setFilterBtn] = useState(false);
  const [filterMenu, setFilterMenu] = useState(1);
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
          <div
            onClick={() => {
              window.location.replace('/');
            }}
          >
            <img
              src={process.env.PUBLIC_URL + '/image/ofpe_logo.png'}
              alt='헤더 로고'
            />
          </div>
        </NavbarBrand>
        <Navbtns>
          <Name>{storeName}님 반갑습니다!</Name>
          <Button
            className='logout'
            onClick={logOut}
            variant='outline-secondary'
          >
            로그아웃
          </Button>
          <Button
            className='write'
            onClick={() => {
              navigate('/write');
            }}
            variant='warning'
          >
            전시하기
          </Button>
          {/* <Filter>
            <img
              onClick={() => {
                setFilterBtn(!filterBtn);
              }}
              src={filterBtn ? filter_act : filter}
              alt='필터아이콘'
            />
            {filterBtn && (
              <ul>
                <li
                  onClick={() => {
                    setFilterMenu(1);
                  }}
                  className={filterMenu === 1 ? 'active' : ''}
                >
                  전체
                </li>
                <li
                  onClick={() => {
                    setFilterMenu(2);
                  }}
                  className={filterMenu === 2 ? 'active' : ''}
                >
                  내가쓴글
                </li>
                <li
                  onClick={() => {
                    setFilterMenu(3);
                  }}
                  className={filterMenu === 3 ? 'active' : ''}
                >
                  즐겨찾기
                </li>
              </ul>
            )}
          </Filter> */}
        </Navbtns>
      </Container>
    </Navwrap>
  );
};

export default Header;
