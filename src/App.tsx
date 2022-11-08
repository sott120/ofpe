// import React from 'react';
// import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import styled from "styled-components";
import axios from "axios";
import { useState } from 'react';

const ip = process.env.REACT_APP_ip;

let LoginBox = styled.section`
    max-width: 500px;
    width: 100%;
    padding: 50px 20px;
    box-sizing: border-box;
    background-color: rgba(0,0,0,50%);
    text-align: center;
`;

interface CardInterface {
    width:number;
}

const Card = styled.div<CardInterface>`
    width: ${(props) => props.width}px;
    height: 100px;
    background-color: green;
    &:hover {
        background-color: red;
    }
    &.active {
        background-color: yellow;
    }
`;

const LoginWrap = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StForm = styled(Form)<CardInterface>`
    background-color: red;
    width: ${(props) => props.width}px;
`;



const Login = () => {
    return(
        <LoginWrap>
          {/* <Card width={500}></Card> */}
          {/* <Card width={500} className={act ? 'active' : undefined}></Card> */}
          <LoginBox>
              <h1>OFPE</h1>
              <h3>우리의 필름 사진전</h3>
              <StForm>
                  <FloatingLabel
                      controlId="floatingInput"
                      label="아이디"
                      className="mb-3"
                  >
                      <Form.Control type="id" placeholder="아이디" />
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingPassword" label="비밀번호">
                      <Form.Control type="password" placeholder="비밀번호" />
                  </FloatingLabel>
                  <Form.Text className="text-muted">
                      비밀번호가 일치하지 않습니다.ㅁ
                  </Form.Text>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check
                          type="checkbox"
                          label="다음부턴 자동 로그인"
                      />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                      로그인
                  </Button>
              </StForm>
          </LoginBox>
           </LoginWrap>
    )
}

function App() {

   const [act,SetAct] = useState<boolean | null>(null)

  return (
      <>
          <Login />

          <button
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
          </button>
      </>
  );

}

export default App;
