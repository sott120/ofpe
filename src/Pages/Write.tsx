import styled from 'styled-components';
import { useState, useRef, RefObject, useEffect, FormEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Container } from 'react-bootstrap';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactS3Client from 'react-aws-s3-typescript';
import imageCompression from 'browser-image-compression';
import { cookieErr } from '../util/pageErr';
import { useAppSelector } from './../store/store';

interface ImgDisplayItf {
  imgBase64: string;
}

const Form2 = styled(Form)`
  & label {
    font-size: 18px;
    font-weight: bold;
  }
  & textarea {
    height: 200px;
    resize: none;
  }
`;

const FormSection = styled.div`
  display: flex;
  & > div {
    width: 50%;
  }
  & > div:first-child {
    margin-right: 20px;
  }
  @media screen and (max-width: 991px) {
    display: block;
    & > div {
      width: 100%;
    }
    & > div:first-child {
      margin-right: 0;
    }
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
    /* margin: auto 10px; */
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
  let navigate = useNavigate();
  let storeId = useAppSelector((state) => state.userSlice.user.id);
  let storeName = useAppSelector((state) => state.userSlice.user.name);
  const [imgBase64, setImgBase64] = useState(''); // ?????? url
  const [imgFile, setImgFile] = useState<File | null>(null); //???????????? ??????
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
      setImgBase64(state.photo_url);
      photoPlace.current!.value = state.photo_place;
      usedCamera.current!.value = state.used_camera;
      usedFilm.current!.value = state.used_film;
      otherFilm.current!.value = state.other_film;
      photoDesc.current!.value = state.photo_desc;
      sbmitBtn.current!.innerText = '????????????';
    } else {
      sbmitBtn.current!.innerText = '??????!';
    }
  }, []);

  //????????? ???????????? ??? ???????????? ?????????
  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files == null) return;
    let file = e.target.files[0];
    const fileChk = /(.*?)\.(jpg|jpeg|png|JPG|JPEG|PNG)$/;

    if (file.name.match(fileChk)) {
      //?????? ???????????? ??????
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
      };
      try {
        const compressedFile = await imageCompression(file, options);
        setImgFile(compressedFile);
        // resize??? ???????????? url??? ?????? fileUrl??? ??????
        const promise = imageCompression.getDataUrlFromFile(compressedFile);
        promise.then((result) => {
          setImgBase64(result);
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('jpg, jpeg, png ????????? ????????? ????????? ???????????????.');
      imgInput.current!.value = '';
    }
  };

  //????????? ??????

  const allChk = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDisabled(true);
    if (imgBase64 === '') {
      alert('????????? ???????????????.');
      imgInput.current!.focus();
      console.log(photoDesc.current!.value);
    } else if (photoName.current!.value === '') {
      alert('?????? ????????? ???????????????.');
      photoName.current!.focus();
    } else if (photoDate.current!.value === '') {
      alert('?????? ????????? ??????????????????.');
      photoDate.current!.focus();
    } else if (photoPlace.current!.value === '') {
      alert('?????? ????????? ???????????????.');
      photoPlace.current!.focus();
    } else if (usedCamera.current!.value === '') {
      alert('????????? ????????? ????????? ???????????????.');
      usedCamera.current!.focus();
    } else if (usedFilm.current!.value === '') {
      alert('????????? ????????? ??????????????????.');
      usedFilm.current!.focus();
    } else {
      if (sbmitBtn.current!.innerText === '??????!') {
        uploadFile(imgFile);
      } else if (sbmitBtn.current!.innerText === '????????????' && imgInput.current!.value === '') {
        axios
          .put(process.env.REACT_APP_ip + '/api/board', {
            index: state.index,
            photo_name: photoName.current!.value,
            photo_date: photoDate.current!.value,
            photo_url: imgBase64,
            photo_place: photoPlace.current!.value,
            used_camera: usedCamera.current!.value,
            used_film: usedFilm.current!.value,
            other_film: otherFilm.current!.value,
            photo_desc: photoDesc.current!.value,
          })
          .then((res) => {
            console.log(res);
            navigate('/');
            alert('?????????????????????.');
          })
          .catch((e) => {
            cookieErr(e.response.status);
          });
      } else if (sbmitBtn.current!.innerText === '????????????' && imgInput.current!.value !== '') {
        updateFile(imgFile);
      }
    }
    setDisabled(false);
  };

  const config = {
    bucketName: process.env.REACT_APP_BUCKET_NAME as string,
    dirName: process.env.REACT_APP_DIRNAME as string,
    region: process.env.REACT_APP_REGION as string,
    accessKeyId: process.env.REACT_APP_ACCESS as string,
    secretAccessKey: process.env.REACT_APP_SECRET as string,
    s3Url: process.env.REACT_APP_S3_URL as string,
  };

  //s3???????????? Post?????? ??????
  const uploadFile = async (file: File | null) => {
    console.log(file);
    console.log(config);
    const S3 = new ReactS3Client(config);
    if (file == null) return;
    S3.uploadFile(file, file.name)
      .then((data) => {
        console.log(data);
        console.log(data.location);
        return data.location;
      })
      .then((res) => {
        axios
          .post(process.env.REACT_APP_ip + '/api/board', {
            user_id: storeId,
            user_name: storeName,
            photo_name: photoName.current!.value,
            photo_date: photoDate.current!.value,
            photo_url: res,
            photo_place: photoPlace.current!.value,
            used_camera: usedCamera.current!.value,
            used_film: usedFilm.current!.value,
            other_film: otherFilm.current!.value,
            photo_desc: photoDesc.current!.value,
          })
          .then((res) => {
            console.log(res);
            navigate('/');
            alert('????????? ??????????????????!');
          })
          .catch((e) => {
            cookieErr(e.response.status);
          });
      })
      .catch((err) => console.error(err));
  };

  //s3 ???????????? Update?????? ??????
  const updateFile = async (file: File | null) => {
    console.log(file);
    console.log(config);
    const S3 = new ReactS3Client(config);
    if (file == null) return;
    S3.uploadFile(file, file.name)
      .then((data) => {
        console.log(data);
        console.log(data.location);
        return data.location;
      })
      .then((res) => {
        axios
          .put(process.env.REACT_APP_ip + '/api/board', {
            index: state.index,
            photo_name: photoName.current!.value,
            photo_date: photoDate.current!.value,
            photo_url: res,
            photo_place: photoPlace.current!.value,
            used_camera: usedCamera.current!.value,
            used_film: usedFilm.current!.value,
            other_film: otherFilm.current!.value,
            photo_desc: photoDesc.current!.value,
          })
          .then((res) => {
            console.log(res);
            navigate('/');
            alert('?????????????????????.');
          })
          .catch((e) => {
            cookieErr(e.response.status);
          });
      })
      .catch((err) => console.error(err));
  };
  return (
    <Container>
      <Form2 className='mt-5 mb-5'>
        <Form.Group className='mb-4'>
          <Form.Label>?????????????????? ?????? ????????? ???????????????!</Form.Label>
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
            accept='image/jpg, image/png, image/jpeg'
            onChange={handleChangeFile}
          />
        </Form.Group>
        <Form.Group className='mb-4'>
          <Form.Label>?????? ??????</Form.Label>
          <Form.Control
            ref={photoName}
            type='text'
            placeholder='?????? ??????'
            maxLength={100}
          />
        </Form.Group>
        <FormSection>
          <Form.Group className='mb-4'>
            <Form.Label>?????????</Form.Label>
            <Form.Control
              ref={photoDate}
              type='date'
              placeholder='?????????'
            />
          </Form.Group>
          <Form.Group className='mb-4'>
            <Form.Label>????????????</Form.Label>
            <Form.Control
              ref={photoPlace}
              type='text'
              placeholder='????????????'
              maxLength={100}
            />
          </Form.Group>
        </FormSection>
        <FormSection>
          <Form.Group className='mb-4'>
            <Form.Label>????????? ??????</Form.Label>
            <Form.Control
              ref={usedCamera}
              type='text'
              placeholder='????????? ??????'
              maxLength={100}
            />
          </Form.Group>
          <Form.Group className='mb-4'>
            <Form.Label>????????? ??????</Form.Label>
            <Form.Select
              ref={usedFilm}
              onChange={(e) => {
                setSelectOption(e.currentTarget.options[e.currentTarget.selectedIndex].value);
              }}
            >
              <option value=''>?????? ??????</option>
              <option value='proimage'>Kodak Proimage 100</option>
              <option value='colorplus'>Kodak Color Plus 200</option>
              <option value='gold'>Kodak Gold 200</option>
              <option value='ultramax'>Kodak Ultra Max 400</option>
              <option value='potra'>Kodak Potra 160</option>
              <option value='potra'>Kodak Potra 400</option>
              <option value='potra'>Kodak Potra 800</option>
              <option value='ektar'>Kodak Ektar 100</option>
              <option value='c200'>Fuji C200</option>
              <option value='buam'>Buam 64</option>
              <option value='nouvelevague'>Nouvekevague</option>
              <option value='other'>?????? ????????????</option>
            </Form.Select>
            <FormControl
              ref={otherFilm}
              selectoption={selectOption}
              className='mt-2'
              type='text'
              placeholder='?????? ????????? ???????????????'
              maxLength={100}
            />
          </Form.Group>
        </FormSection>
        <Form.Group className='mb-4'>
          <Form.Label>?????? ??????</Form.Label>
          <Form.Control
            ref={photoDesc}
            as='textarea'
            placeholder='????????? ?????? ????????? ???????????? ???????????????'
            maxLength={2000}
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
