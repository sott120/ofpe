import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import styled from 'styled-components';
import { useState, useRef, RefObject } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './../store/store';
import { setUser } from './../store/userSlice';
import { pageErr } from './../util/pageErr';

const cookie = new Cookies();

const LoginWrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('/image/login_bg.jpg');
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
  & > h1 {
    font-size: 0;
  }
  & > h1 > img {
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
  }
  & > h3 > span {
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

const GuestTxt = styled.div`
  color: #aaa;
  word-break: keep-all;
  & > p > span {
    text-decoration: underline;
    color: #fff;
    cursor: pointer;
  }
`;

interface StyledProps extends LoginBoxItf, FormTxtItf {}

const Login = ({ boxOpacity, textAlign, color }: StyledProps) => {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [disabled, setDisabled] = useState(false);
  const goId = useRef() as RefObject<HTMLInputElement>;
  const goPw = useRef() as RefObject<HTMLInputElement>;
  let storeId = useAppSelector((state) => state.user.id);
  //로그인 되어있을때 로그인페이지 막기
  useEffect(() => {
    // pageErr(cookie.get('name'));
    if (storeId) {
      console.log(storeId && storeId !== '');
      alert('이미 로그인 되어있습니다!');
      window.location.replace('/');
    }

    storeId !== undefined && setDisabled(true);
  }, []);

  const goChk = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDisabled(true);
    if (goId.current!.value === '') {
      alert('아이디를 입력해주세요.');
      goId.current!.focus();
    } else if (goPw.current!.value === '') {
      alert('비밀번호를 입력해주세요.');
      goPw.current!.focus();
    } else if (goId.current!.value !== '' && goPw.current!.value !== '') {
      axios
        .post(process.env.REACT_APP_ip + '/api/login', { id: goId.current!.value, pw: goPw.current!.value })
        .then((res) => {
          if (res.data == false) {
            alert('아이디 또는 비밀번호가 일치하지 않습니다.');
          } else {
            //로그인 성공시 코드
            navigate('/');
            dispatch(setUser(res.data));
          }
        })
        .catch((e) => {
          console.error(e);
        });
    }
    setDisabled(false);
  };

  const guest = () => {
    axios
      .post(process.env.REACT_APP_ip + '/api/login/guest', { id: 'guest', name: 'guest' })
      .then((res) => {
        navigate('/');
        dispatch(setUser(res.data));
      })
      .catch((e) => {
        console.error(e);
      });
  };
  return (
    <LoginWrap>
      <LoginBox
        boxOpacity={60}
        textAlign={'center'}
      >
        <h1 className='mb-3'>
          OFPE
          <img
            src='./image/ofpe_logo.png'
            alt='오프 로고이미지'
          />
        </h1>
        <h3 className='mb-5'>
          <span>OFPE</span>우리들의 필름 사진전
        </h3>
        <Form>
          <FloatingLabel
            controlId='floatingInput'
            label='아이디'
            className='mb-4 text-dark'
          >
            <Form.Control
              type='text'
              ref={goId}
              placeholder='아이디'
            />
          </FloatingLabel>

          <FloatingLabel
            controlId='floatingPassword'
            label='비밀번호'
            className='mb-3 text-dark'
          >
            <Form.Control
              type='password'
              ref={goPw}
              placeholder='비밀번호'
            />
          </FloatingLabel>
          {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <FormCheck
                            type="checkbox"
                            label="다음부턴 자동 로그인"
                        />
                    </Form.Group> */}
          <Button
            variant='warning'
            className='mb-3'
            onClick={goChk}
            disabled={disabled}
          >
            로그인
          </Button>
        </Form>
        <Button
          variant='dark'
          disabled={disabled}
          className='mb-3'
          onClick={guest}
        >
          게스트로 로그인
        </Button>
        <GuestTxt>
          <p>게스트 로그인은 포트폴리오용으로 구현한 기능입니다.</p>
          <p>
            사이트를 이용하실 분들은{' '}
            <span
              onClick={() => {
                navigate('/join');
              }}
            >
              회원가입
            </span>
            해주세요.
          </p>
        </GuestTxt>
      </LoginBox>
    </LoginWrap>
  );
};

const Join = ({ boxOpacity, textAlign, color }: StyledProps) => {
  let navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const [passBtn, setPassBtn] = useState({ id: false, name: false, pw: false, pwchk: false });
  const idRef = useRef() as RefObject<HTMLInputElement>;
  const nameRef = useRef() as RefObject<HTMLInputElement>;
  const pwRef = useRef() as RefObject<HTMLInputElement>;
  const pwchkRef = useRef() as RefObject<HTMLInputElement>;
  const member = useRef() as RefObject<HTMLFormElement>;
  let chkIdCont = [
    { color: '888', txt: '5~20자 영문 소문자, 숫자' },
    { color: 'ff5252', txt: '5~20자 영문 소문자, 숫자만 입력 가능합니다' },
    { color: 'ff5252', txt: '필수사항입니다.' },
    { color: 'ff5252', txt: '이미 사용중인 아이디입니다.' },
    { color: '00bc79', txt: '사용 가능한 아이디입니다.' },
  ];
  let chkNameCont = [
    { color: '888', txt: '2~10자 한글과 영문 대 소문자' },
    { color: 'ff5252', txt: '2~10자 한글과 영문 대 소문자만 입력 가능합니다.' },
    { color: 'ff5252', txt: '필수사항입니다.' },
    { color: 'ff5252', txt: '이미 사용중인 닉네임입니다.' },
    { color: '00bc79', txt: '사용 가능한 닉네임입니다.' },
  ];
  let chkPwCont = [
    { color: '888', txt: '4~16자 영문 대 소문자, 숫자, 특수문자' },
    { color: 'ff5252', txt: '4~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.' },
    { color: 'ff5252', txt: '필수사항입니다.' },
    { color: '00bc79', txt: '사용 가능한 비밀번호입니다.' },
  ];
  let chkPw2Cont = [
    { color: '888', txt: '비밀번호를 확인해주세요.' },
    { color: 'ff5252', txt: '비밀번호가 일치하지 않습니다.' },
    { color: '00bc79', txt: '비밀번호가 일치합니다.' },
  ];
  const [idTxt, setIdTxt] = useState(chkIdCont[0]);
  const [nameTxt, setNameTxt] = useState(chkNameCont[0]);
  const [pwTxt, setPwTxt] = useState(chkPwCont[0]);
  const [pwchkTxt, setPwchkTxt] = useState(chkPw2Cont[0]);

  const chkId = () => {
    const idPattern = /^[a-zA-Z0-9]{5,20}$/g;
    const id = idRef.current!.value;
    let copy = { ...passBtn };
    //아이디 서버로 보내서 확인하기
    axios
      .post(process.env.REACT_APP_ip + '/api/member/id', { id: id })
      .then((res) => {
        console.log(res);
        if (!idPattern.test(id) && id !== '') {
          setIdTxt(chkIdCont[1]);
          copy.id = false;
          setPassBtn(copy);
        } else if (!idPattern.test(id) && id === '') {
          setIdTxt(chkIdCont[2]);
          copy.id = false;
          setPassBtn(copy);
        } else if (res.data === false) {
          setIdTxt(chkIdCont[3]);
          copy.id = false;
          setPassBtn(copy);
        } else if (idPattern.test(id) && res.data === true && id !== '') {
          setIdTxt(chkIdCont[4]);
          copy.id = true;
          setPassBtn(copy);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };
  const chkName = () => {
    const namePattern = /^[a-zA-Z가-힣]{2,10}$/g;
    const name = nameRef.current!.value;
    let copy = { ...passBtn };
    //아이디 서버로 보내서 확인하기
    axios
      .post(process.env.REACT_APP_ip + '/api/member/name', { name: name })
      .then((res) => {
        if (!namePattern.test(name) && name !== '') {
          setNameTxt(chkNameCont[1]);
          copy.name = false;
          setPassBtn(copy);
        } else if (!namePattern.test(name) && name === '') {
          setNameTxt(chkNameCont[2]);
          copy.name = false;
          setPassBtn(copy);
        } else if (res.data === false) {
          setNameTxt(chkNameCont[3]);
          copy.name = false;
          setPassBtn(copy);
        } else if (namePattern.test(name) && res.data === true && name !== '') {
          setNameTxt(chkNameCont[4]);
          copy.name = true;
          setPassBtn(copy);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };
  const chkPw = () => {
    const pwPattern = /^[a-zA-Z0-9~!@#$%^&*()_+|<>?:{}]{4,16}$/g;
    const pw = pwRef.current!.value;
    pwchkRef.current!.value = '';
    let copy = { ...passBtn };
    setPwchkTxt(chkPw2Cont[0]);
    copy.pwchk = false;
    if (!pwPattern.test(pw) && pw !== '') {
      setPwTxt(chkPwCont[1]);
      copy.pw = false;
      setPassBtn(copy);
    } else if (!pwPattern.test(pw) && pw === '') {
      setPwTxt(chkPwCont[2]);
      copy.pw = false;
      setPassBtn(copy);
    } else if (pwPattern.test(pw)) {
      setPwTxt(chkPwCont[3]);
      copy.pw = true;
      setPassBtn(copy);
    }
  };
  const chkPw2 = () => {
    const pw = pwRef.current!.value;
    const pwchk = pwchkRef.current!.value;
    let copy = { ...passBtn };
    if (pw === pwchk) {
      setPwchkTxt(chkPw2Cont[2]);
      copy.pwchk = true;
      setPassBtn(copy);
    } else {
      setPwchkTxt(chkPw2Cont[1]);
      copy.pwchk = false;
      setPassBtn(copy);
    }
  };

  const passChk = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = idRef.current!.value;
    const name = nameRef.current!.value;
    const pw = pwRef.current!.value;
    e.preventDefault();
    setDisabled(true);
    if (passBtn.id === false) {
      alert('아이디를 확인해주세요.');
      idRef.current!.focus();
    } else if (passBtn.name === false) {
      alert('닉네임을 확인해주세요.');
      nameRef.current!.focus();
    } else if (passBtn.pw === false) {
      alert('비밀번호를 확인해주세요.');
      pwRef.current!.focus();
    } else if (passBtn.pwchk === false) {
      alert('비밀번호가 일치하지 않습니다.');
      pwchkRef.current!.focus();
    } else {
      axios
        .post(process.env.REACT_APP_ip + '/api/member', { id: id, name: name, pw: pw })
        .then((res) => {
          alert('회원가입이 완료되었습니다.');
          navigate('/login');
        })
        .catch((e) => {
          console.error(e);
        });
    }
    setDisabled(false);
  };

  return (
    <LoginWrap>
      <LoginBox
        boxOpacity={100}
        textAlign={'left'}
      >
        <h1 className='mb-3'>
          OFPE
          <img
            src='./image/ofpe_logo.png'
            alt='오프 로고이미지'
          />
        </h1>
        <h3 className='mb-5'>회원가입</h3>
        <Form ref={member}>
          <Form.Group className='mb-3'>
            <Form.Label>아이디</Form.Label>
            <Form.Control
              onBlur={chkId}
              ref={idRef}
              type='text'
            />
            <FormTxt color={idTxt.color}>{idTxt.txt}</FormTxt>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>닉네임</Form.Label>
            <Form.Control
              onBlur={chkName}
              ref={nameRef}
              type='text'
            />
            <FormTxt color={nameTxt.color}>{nameTxt.txt}</FormTxt>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              onChange={chkPw}
              ref={pwRef}
              type='password'
            />
            <FormTxt color={pwTxt.color}>{pwTxt.txt}</FormTxt>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>비밀번호 확인</Form.Label>
            <Form.Control
              onChange={chkPw2}
              ref={pwchkRef}
              type='password'
            />
            <FormTxt color={pwchkTxt.color}>{pwchkTxt.txt}</FormTxt>
          </Form.Group>
          <Button
            variant='warning'
            className='mb-3'
            onClick={passChk}
            disabled={disabled}
          >
            회원가입
          </Button>
        </Form>
      </LoginBox>
    </LoginWrap>
  );
};

export { Login, Join };
