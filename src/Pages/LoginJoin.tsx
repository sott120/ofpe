import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import styled from "styled-components";
import { useState, useRef } from "react";

const LoginWrap = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("/image/login_bg.jpg");
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
`;

interface LoginBoxItf {
    boxOpacity?: number;
    textAlign?: string;
}

const LoginBox = styled.section<LoginBoxItf>`
    max-width: 500px;
    width: 100%;
    padding: 60px 30px;
    margin: 0 20px;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, ${(props) => props.boxOpacity}%);
    text-align: ${(props) => props.textAlign};
    color: white;
    & > h1{
        font-size: 0;
    }
    & > h1 >img{
        width: 80px;
        height: 80px;
        margin-bottom: 10px;
    }
    & > h3 > span{
        display: block;
        margin-bottom: 5px;
    }
`;

const FormTxt = styled(Form.Text)`
    display: block;
    width: 100%;
    margin-top: 0.25rem;
    font-size: 0.875em;
    color: #dc3545;
`;

interface CardInterface {
    width: number;
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

const FormCheck = styled(Form.Check)<CardInterface>`
    display: inline-block;
`;

const Login = ({ boxOpacity, textAlign }: LoginBoxItf) => {
    return (
        <LoginWrap>
            <LoginBox boxOpacity={60} textAlign={"center"}>
                <h1 className="mb-3">OFPE
                    <img src="./image/ofpe_logo.png" alt="오프 로고이미지" />
                </h1>
                <h3 className="mb-5"><span>OFPE</span>우리들의 필름 사진전</h3>
                <Form>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="아이디"
                        className="mb-3 text-dark"
                    >
                        <Form.Control type="text" placeholder="아이디" />
                        <FormTxt className="invalid-feedback">
                            아이디를 입력해주세요.
                        </FormTxt>
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingPassword"
                        label="비밀번호"
                        className="mb-3 text-dark"
                    >
                        <Form.Control type="password" placeholder="비밀번호" />
                        <FormTxt className="invalid-feedback">
                            비밀번호가 일치하지 않습니다.
                        </FormTxt>
                    </FloatingLabel>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <FormCheck
                            type="checkbox"
                            label="다음부턴 자동 로그인"
                        />
                    </Form.Group>
                    <Button variant="warning" type="submit" className="mb-3">
                        로그인
                    </Button>
                </Form>
                <Button variant="dark" type="submit">
                    게스트로 로그인
                </Button>
            </LoginBox>
        </LoginWrap>
    );
};

const Join = ({ boxOpacity, textAlign }: LoginBoxItf) => {
    const idPattern = /^[a-zA-Z0-9_-]{5,20}$/g;
    const pwPattern = /^[a-zA-Z0-9~!@#$%^&*()_+|<>?:{}]{8,16}$/g;
    const namePattern = /^[a-zA-Z가-힣]{1,10}$/g;
    const id = useRef();

    return (
        <LoginWrap>
            <LoginBox boxOpacity={100} textAlign={"left"}>
                <h1 className="mb-3">
                    OFPE
                    <img src="./image/ofpe_logo.png" alt="오프 로고이미지" />
                </h1>
                <h3 className="mb-5">회원가입</h3>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>아이디</Form.Label>
                        <Form.Control name="userName" type="text" />
                        <FormTxt className="invalid-feedback">
                            아이디를 입력해주세요
                        </FormTxt>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>닉네임</Form.Label>
                        <Form.Control type="text" />
                        <FormTxt>닉네임을 입력해주세요</FormTxt>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>비밀번호</Form.Label>
                        <Form.Control type="text" />
                        <FormTxt>비밀번호를 입력해주세요.</FormTxt>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>비밀번호 확인</Form.Label>
                        <Form.Control type="text" />
                        <FormTxt>비밀번호를 확인해주세요</FormTxt>
                    </Form.Group>
                    <Button variant="warning" type="submit" className="mb-3">
                        회원가입
                    </Button>
                </Form>
                <Button variant="dark" type="submit">
                    게스트로 보기
                </Button>
            </LoginBox>
        </LoginWrap>
    );
};

export {Login, Join}