import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import styled from "styled-components";
import { useState, useRef, RefObject } from "react";

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

const FormCheck = styled(Form.Check)`
    display: inline-block;
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

interface FormTxtItf {
    color?: string;
}

const FormTxt = styled(Form.Text)<FormTxtItf>`
    display: block;
    width: 100%;
    margin-top: 0.4rem;
    font-size: 0.875em;
    color: #${(props) => props.color};
`;

interface StyledProps extends LoginBoxItf, FormTxtItf {}

const Login = ({ boxOpacity, textAlign, color }: StyledProps) => {
    return (
        <LoginWrap>
            <LoginBox boxOpacity={60} textAlign={"center"}>
                <h1 className="mb-3">
                    OFPE
                    <img src="./image/ofpe_logo.png" alt="오프 로고이미지" />
                </h1>
                <h3 className="mb-5">
                    <span>OFPE</span>우리들의 필름 사진전
                </h3>
                <Form>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="아이디"
                        className="mb-3 text-dark"
                    >
                        <Form.Control type="text" placeholder="아이디" />
                        <FormTxt>아이디를 입력해주세요.</FormTxt>
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingPassword"
                        label="비밀번호"
                        className="mb-3 text-dark"
                    >
                        <Form.Control type="password" placeholder="비밀번호" />
                        <FormTxt>비밀번호가 일치하지 않습니다.</FormTxt>
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

const Join = ({ boxOpacity, textAlign, color }: StyledProps) => {
    const idRef = useRef() as RefObject<HTMLInputElement>;
    const nameRef = useRef() as RefObject<HTMLInputElement>;
    const pwRef = useRef() as RefObject<HTMLInputElement>;
    const pwchkRef = useRef() as RefObject<HTMLInputElement>;
    let chkIdCont = [
        { color: "888", txt: "5~20자 영문 소문자, 숫자" },
        { color: "ff5252", txt: "5~20자 영문 소문자, 숫자만 입력 가능합니다" },
        { color: "ff5252", txt: "필수사항입니다." },
        { color: "ff5252", txt: "이미 사용중인 아이디입니다." },
        { color: "00bc79", txt: "사용 가능한 아이디입니다." },
    ];
    let chkNameCont = [
        { color: "888", txt: "2~10자 한글과 영문 대 소문자" },
        { color: "ff5252",txt: "2~10자 한글과 영문 대 소문자만 입력 가능합니다."},
        { color: "ff5252", txt: "필수사항입니다." },
        { color: "ff5252", txt: "이미 사용중인 닉네임입니다." },
        { color: "00bc79", txt: "사용 가능한 닉네임입니다." },
    ];
    let chkPwCont = [
        { color: "888", txt: "4~16자 영문 대 소문자, 숫자, 특수문자" },
        { color: "ff5252", txt: "4~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요."},
        { color: "ff5252", txt: "필수사항입니다." },
        { color: "00bc79", txt: "사용 가능한 비밀번호입니다." },
    ];
    let chkPw2Cont = [
        { color: "888", txt: "비밀번호를 확인해주세요." },
        { color: "ff5252", txt: "비밀번호가 일치하지 않습니다." },
        { color: "00bc79", txt: "비밀번호가 일치합니다." },
    ];
    const [idTxt, setIdTxt] = useState(chkIdCont[0]);
    const [nameTxt, setNameTxt] = useState(chkNameCont[0]);
    const [pwTxt, setPwTxt] = useState(chkPwCont[0]);
    const [pwchkTxt, setPwchkTxt] = useState(chkPw2Cont[0]);

    function chkId() {
        const idPattern = /^[a-zA-Z0-9]{5,20}$/g;
        const id = idRef.current!.value;
        if (!idPattern.test(id) && id !== "") {
            setIdTxt(chkIdCont[1]);
        } else if (!idPattern.test(id) && id === "") {
            setIdTxt(chkIdCont[2]);
        } else if (idPattern.test(id)) {
            setIdTxt(chkIdCont[4]);
        }
    }
    function chkName() {
        const namePattern = /^[a-zA-Z가-힣]{2,10}$/g;
        const name = nameRef.current!.value;
        if (!namePattern.test(name) && name !== "") {
            setNameTxt(chkNameCont[1]);
        } else if (!namePattern.test(name) && name === "") {
            setNameTxt(chkNameCont[2]);
        } else if (namePattern.test(name)) {
            setNameTxt(chkNameCont[4]);
        }
    }
    function chkPw() {
        const pwPattern = /^[a-zA-Z0-9~!@#$%^&*()_+|<>?:{}]{4,16}$/g;
        const pw = pwRef.current!.value;
        if (!pwPattern.test(pw) && pw !== "") {            
            setPwTxt(chkPwCont[1]);
        } else if (!pwPattern.test(pw) && pw === "") {            
            setPwTxt(chkPwCont[2]);
        } else if (pwPattern.test(pw)) {
            setPwTxt(chkPwCont[3]);            
        }
    }
    function chkPw2() {
        const pw = pwRef.current!.value;
        const pwchk = pwchkRef.current!.value;
        if(pw === pwchk){
            setPwchkTxt(chkPw2Cont[2])
        } else{ setPwchkTxt(chkPw2Cont[1])}
    }

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
                        <Form.Control onBlur={chkId} ref={idRef} type="text" />
                        <FormTxt color={idTxt.color}>{idTxt.txt}</FormTxt>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>닉네임</Form.Label>
                        <Form.Control
                            onBlur={chkName}
                            ref={nameRef}
                            type="text"
                        />
                        <FormTxt color={nameTxt.color}>{nameTxt.txt}</FormTxt>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>비밀번호</Form.Label>
                        <Form.Control
                            onChange={chkPw}
                            ref={pwRef}
                            type="password"
                        />
                        <FormTxt color={pwTxt.color}>{pwTxt.txt}</FormTxt>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>비밀번호 확인</Form.Label>
                        <Form.Control
                            onChange={chkPw2}
                            ref={pwchkRef}
                            type="password"
                        />
                        <FormTxt color={pwchkTxt.color}>{pwchkTxt.txt}</FormTxt>
                    </Form.Group>
                    <Button variant="warning" type="submit" className="mb-3">
                        회원가입
                    </Button>
                </Form>
                <Button variant="dark" >게스트로 보기</Button>
            </LoginBox>
        </LoginWrap>
    );
};

export {Login, Join}