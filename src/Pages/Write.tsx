import styled from "styled-components";
import { useState, useRef, RefObject } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Container } from "react-bootstrap";

interface ImgDisplayItf {
    imgBase64:string
}

const Form2 = styled(Form)`
    & label{
        font-size: 18px;
        font-weight: bold;
    }
`

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
        content: "";
        display: block;
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 100%;
        background-image: url("./image/add_photo.png");
        background-position: center center;
        background-repeat: no-repeat;
    }
    & img {
        position: absolute;
        z-index: 2;
        width: 100%;
        height: 100%;
        display: ${(props) => (props.imgBase64 === "" ? "none" : "block")};
        object-fit: contain;
    }
`;

interface SelectItf {
    selectOption: string;
}

const FormControl = styled(Form.Control)<SelectItf>`
    display: ${(props) => (props.selectOption === "other" ? "block" : "none")};
`;

const Write = () => {
    const [imgBase64, setImgBase64] = useState(""); // 파일 base64
    const [imgFile, setImgFile] = useState(null); //파일
    const [selectOption, setSelectOption] = useState("");
    
    const imgInput = useRef() as RefObject<HTMLInputElement>;
    const photoName = useRef() as RefObject<HTMLInputElement>;
    const photoDate = useRef() as RefObject<HTMLInputElement>;
    const photoPlace = useRef() as RefObject<HTMLInputElement>;
    const usedCamera = useRef() as RefObject<HTMLInputElement>;
    const usedFilm = useRef() as RefObject<HTMLSelectElement>;
    const otherFilm = useRef() as RefObject<HTMLInputElement>;
    const write = useRef() as RefObject<HTMLFormElement>;

    const allChk = ()=>{
        if (imgInput.current!.value === "") {
            alert("사진을 골라주세요.");
            imgInput.current!.focus();
        } else if (photoName.current!.value === "") {
            alert("작품 이름을 적어주세요.");
            photoName.current!.focus();
        } else if (photoDate.current!.value === "") {
            alert("촬영 날짜를 설정해주세요.");
            photoDate.current!.focus();
        } else if (photoPlace.current!.value === "") {
            alert("촬영 장소를 적어주세요.");
            photoPlace.current!.focus();
        } else if (usedCamera.current!.value === "") {
            alert("시용한 카메라 기종을 적어주세요.");
            usedCamera.current!.focus();
        } else if (usedFilm.current!.value === "") {
            alert("사용한 필름을 선택해주세요.");
            usedFilm.current!.focus();
        } else {
           write.current!.submit();
        }
    }

    
    const handleChangeFile = (event:any) => {
        let reader = new FileReader();
        reader.onloadend = () => {
            // 2. 읽기가 완료되면 아래코드가 실행됩니다.
            const base64 = reader.result;
            if (base64) {
                setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
            }
        };
        if (event.target.files[0]) {
            reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
            setImgFile(event.target.files[0]); // 파일 상태 업데이트
        }
    };
    


    return (
        <Container>
            <Form2 ref={write} className="mt-5 mb-5">
                <Form.Group className="mb-4">
                    <Form.Label>필름카메라로 찍은 사진을 올려주세요.</Form.Label>
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
                        type="file"
                        onChange={handleChangeFile}
                    />
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label>작품 이름</Form.Label>
                    <Form.Control
                        ref={photoName}
                        type="text"
                        placeholder="작품 이름"
                    />
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label>촬영일</Form.Label>
                    <Form.Control
                        ref={photoDate}
                        type="date"
                        placeholder="촬영일"
                    />
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label>촬영장소</Form.Label>
                    <Form.Control
                        ref={photoPlace}
                        type="text"
                        placeholder="촬영장소"
                    />
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label>카메라 기종</Form.Label>
                    <Form.Control
                        ref={usedCamera}
                        type="text"
                        placeholder="카메라 기종"
                    />
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label>사용한 필름</Form.Label>
                    <Form.Select
                        ref={usedFilm}
                        onChange={(e) => {
                            setSelectOption(
                                e.currentTarget.options[
                                    e.currentTarget.selectedIndex
                                ].value
                            );
                        }}
                    >
                        <option value="">필름 선택</option>
                        <option value="proimage">Kodak Proimage 100</option>
                        <option value="colorpluse">Kodak Color Plus 200</option>
                        <option value="gold">Kodak Gold 200</option>
                        <option value="ultramax">Kodak Ultra Max 400</option>
                        <option value="potra">Kodak Potra 160</option>
                        <option value="potra">Kodak Potra 400</option>
                        <option value="potra">Kodak Potra 800</option>
                        <option value="Ektar">Kodak Ektar 100</option>
                        <option value="c200">Fuji C200</option>
                        <option value="buam">Buam 64</option>
                        <option value="nouvekevague">Nouvekevague</option>
                        <option value="other">직접 작성하기</option>
                    </Form.Select>
                    <FormControl
                        ref={otherFilm}
                        selectoption={selectOption}
                        className="mt-2"
                        type="text"
                        placeholder="필름 이름을 적어주세요"
                    />
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label>작품 설명</Form.Label>
                    <Form.Control
                        as="textarea"
                        placeholder="작품에 대한 내용을 자유롭게 적어주세요"
                    />
                </Form.Group>
                <Button variant="dark" onClick={allChk}>
                    찰칵!
                </Button>
            </Form2>
        </Container>
    );
}

export default Write;