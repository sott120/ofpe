import styled from 'styled-components';
import { useState, useRef, RefObject, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Container } from 'react-bootstrap';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ReactS3Client from 'react-aws-s3-typescript';

interface ImgDisplayItf {
  imgBase64: string;
}

const Form2 = styled(Form)`
  & label {
    font-size: 18px;
    font-weight: bold;
  }
`;

const ImgPreview = styled.div<ImgDisplayItf>`
  width: 516px;
  height: 300px;
  position: relative;
  background-color: #ececec;
  margin: 10px 0;
  cursor: pointer;
  @media screen and (max-width: 575px) {
    width: 100%;
    margin: auto 10px;
  }
  &::before {
    content: '';
    display: block;
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-image: url('./image/add_photo.png');
    background-position: center center;
    background-repeat: no-repeat;
  }
  & img {
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    display: ${(props) => (props.imgBase64 === '' ? 'none' : 'block')};
    object-fit: contain;
  }
`;

interface SelectItf {
  selectoption: string;
}

const FormControl = styled(Form.Control)<SelectItf>`
  display: ${(props) => (props.selectoption === 'other' ? 'block' : 'none')};
`;

const Write = () => {
  const { state } = useLocation();
  console.log(state);

  const [imgBase64, setImgBase64] = useState(''); // 파일 base64
  const [imgFile, setImgFile] = useState(null); //파일
  const [selectOption, setSelectOption] = useState('');
  const [disabled, setDisabled] = useState(false);
  const imgInput = useRef() as RefObject<HTMLInputElement>;
  const photoName = useRef() as RefObject<HTMLInputElement>;
  const photoDate = useRef() as RefObject<HTMLInputElement>;
  const photoPlace = useRef() as RefObject<HTMLInputElement>;
  const usedCamera = useRef() as RefObject<HTMLInputElement>;
  const usedFilm = useRef() as RefObject<HTMLSelectElement>;
  const otherFilm = useRef() as RefObject<HTMLInputElement>;
  const photoDesc = useRef() as RefObject<HTMLTextAreaElement>;
  const sbmitBtn = useRef() as RefObject<HTMLButtonElement>;

  useEffect(() => {
    if (state) {
      photoName.current!.value = state.photo_name;
      photoDate.current!.value = state.photo_date;
      photoPlace.current!.value = state.photo_place;
      usedCamera.current!.value = state.used_camera;
      usedFilm.current!.value = state.used_film;
      otherFilm.current!.value = state.other_film;
      photoDesc.current!.value = state.photo_desc;
      sbmitBtn.current!.innerText = '수정하기';
    } else {
      sbmitBtn.current!.innerText = '찰칵!';
    }
  }, []);

  const allChk = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDisabled(true);
    if (imgInput.current!.value === '') {
      alert('사진을 골라주세요.');
      imgInput.current!.focus();
      console.log(photoDesc.current!.value);
    } else if (photoName.current!.value === '') {
      alert('작품 이름을 적어주세요.');
      photoName.current!.focus();
    } else if (photoDate.current!.value === '') {
      alert('촬영 날짜를 설정해주세요.');
      photoDate.current!.focus();
    } else if (photoPlace.current!.value === '') {
      alert('촬영 장소를 적어주세요.');
      photoPlace.current!.focus();
    } else if (usedCamera.current!.value === '') {
      alert('시용한 카메라 기종을 적어주세요.');
      usedCamera.current!.focus();
    } else if (usedFilm.current!.value === '') {
      alert('사용한 필름을 선택해주세요.');
      usedFilm.current!.focus();
    } else {
      if (sbmitBtn.current!.innerText === '찰칵!') {
        axios
          .post(process.env.REACT_APP_ip + '/board', {
            photo_name: photoName.current!.value,
            photo_date: photoDate.current!.value,
            photo_url: uploadFile(imgFile),
            photo_place: photoPlace.current!.value,
            used_camera: usedCamera.current!.value,
            used_film: usedFilm.current!.value,
            other_film: otherFilm.current!.value,
            photo_desc: photoDesc.current!.value,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((e) => {
            console.error(e);
          });
      } else if (sbmitBtn.current!.innerText === '수정하기') {
        axios
          .put(process.env.REACT_APP_ip + '/board', {
            index: state.index,
            photo_name: photoName.current!.value,
            photo_date: photoDate.current!.value,
            photo_place: photoPlace.current!.value,
            used_camera: usedCamera.current!.value,
            used_film: usedFilm.current!.value,
            other_film: otherFilm.current!.value,
            photo_desc: photoDesc.current!.value,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((e) => {
            console.error(e);
          });
      }
    }
    setDisabled(false);
  };

  const handleChangeFile = (e: any) => {
    let reader = new FileReader();
    reader.onloadend = () => {
      // 2. 읽기가 완료되면 아래코드가 실행됩니다.
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
      }
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
      setImgFile(e.target.files[0]); // 파일 상태 업데이트
    }
  };

  const config = {
    bucketName: process.env.REACT_APP_BUCKET_NAME as string,
    dirName: process.env.REACT_APP_DIRNAME as string,
    region: process.env.REACT_APP_REGION as string,
    accessKeyId: process.env.REACT_APP_ACCESS as string,
    secretAccessKey: process.env.REACT_APP_SECRET as string,
    s3Url: process.env.REACT_APP_S3_URL as string,
  };

  //이미지 저장
  const uploadFile = async (file: any) => {
    console.log(file);
    console.log(config);

    const S3 = new ReactS3Client(config);
    // the name of the file uploaded is used to upload it to S3
    S3.uploadFile(file, file.name)
      .then((data: any) => {
        console.log(data);
        console.log(data.location);
        return data.location;
      })
      .catch((err: any) => console.error(err));
  };
  return (
    <Container>
      <Form2 className='mt-5 mb-5'>
        <Form.Group className='mb-4'>
          <Form.Label>필름카메라로 찍은 사진을 올려주세요!</Form.Label>
          <ImgPreview
            imgBase64={imgBase64}
            onClick={() => {
              imgInput.current?.click();
            }}
          >
            <img src={imgBase64}></img>
          </ImgPreview>
          <Form.Control
            ref={imgInput}
            type='file'
            onChange={handleChangeFile}
          />
        </Form.Group>
        <Form.Group className='mb-4'>
          <Form.Label>작품 이름</Form.Label>
          <Form.Control
            ref={photoName}
            type='text'
            placeholder='작품 이름'
          />
        </Form.Group>
        <Form.Group className='mb-4'>
          <Form.Label>촬영일</Form.Label>
          <Form.Control
            ref={photoDate}
            type='date'
            placeholder='촬영일'
          />
        </Form.Group>
        <Form.Group className='mb-4'>
          <Form.Label>촬영장소</Form.Label>
          <Form.Control
            ref={photoPlace}
            type='text'
            placeholder='촬영장소'
          />
        </Form.Group>
        <Form.Group className='mb-4'>
          <Form.Label>카메라 기종</Form.Label>
          <Form.Control
            ref={usedCamera}
            type='text'
            placeholder='카메라 기종'
          />
        </Form.Group>
        <Form.Group className='mb-4'>
          <Form.Label>사용한 필름</Form.Label>
          <Form.Select
            ref={usedFilm}
            onChange={(e) => {
              setSelectOption(e.currentTarget.options[e.currentTarget.selectedIndex].value);
            }}
          >
            <option value=''>필름 선택</option>
            <option value='proimage'>Kodak Proimage 100</option>
            <option value='colorpluse'>Kodak Color Plus 200</option>
            <option value='gold'>Kodak Gold 200</option>
            <option value='ultramax'>Kodak Ultra Max 400</option>
            <option value='potra'>Kodak Potra 160</option>
            <option value='potra'>Kodak Potra 400</option>
            <option value='potra'>Kodak Potra 800</option>
            <option value='ektar'>Kodak Ektar 100</option>
            <option value='c200'>Fuji C200</option>
            <option value='buam'>Buam 64</option>
            <option value='nouvelevague'>Nouvekevague</option>
            <option value='other'>직접 작성하기</option>
          </Form.Select>
          <FormControl
            ref={otherFilm}
            selectoption={selectOption}
            className='mt-2'
            type='text'
            placeholder='필름 이름을 적어주세요'
          />
        </Form.Group>
        <Form.Group className='mb-4'>
          <Form.Label>작품 설명</Form.Label>
          <Form.Control
            ref={photoDesc}
            as='textarea'
            placeholder='작품에 대한 내용을 자유롭게 적어주세요'
          />
        </Form.Group>
        <Button
          variant='dark'
          ref={sbmitBtn}
          onClick={allChk}
          disabled={disabled}
        ></Button>
      </Form2>
    </Container>
  );
};

export default Write;
