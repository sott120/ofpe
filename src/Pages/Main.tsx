import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button, Modal, Form } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
import { useState, useRef, RefObject } from "react";
import { Routes, Route, Link, useNavigate, Outlet, Navigate } from "react-router-dom";
import Masonry from "react-masonry-css";
import { useEffect } from "react";

const breakpointColumnsObj = {
    default: 4,
    1199: 3,
    830: 2,
    575: 1,
};

const CustomMasonry = styled(Masonry)`
    &.my-masonry-grid {
        display: -webkit-box; /* Not needed if autoprefixing */
        display: -ms-flexbox; /* Not needed if autoprefixing */
        display: flex;
        width: auto;
    }
    &.my-masonry-grid_column {
        /* gutter size */
        background-clip: padding-box;
    }
`;

const Figure = styled.div`
    cursor: pointer;
    border-radius: 10px;
    overflow: hidden;
    margin: 10px;
    margin-bottom: 20px;
    position: relative;
    & img {
        width: 100%;
    }
    & figcaption {
        position: absolute;
        bottom: 20px;
        right: 20px;
        color: yellow;
    }
`;

const ModalInner = styled.div`
    display: flex;
    word-break: break-all;
    @media screen and (max-width: 991px) {
        flex-direction: column;
        & section:last-child {
            margin-top: 10px;
        }
    }
    & section:first-child {
        flex: 6;
    }
    & section:last-child {
        flex: 4;
        padding-left: 10px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    & section > img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        background-color: #ececec;
    }
    & article {
        padding: 0 10px;
        border-bottom: 1px solid #ececec;
    }
`;

const FormControl = styled(Form.Control)`
    width: 100%;
    height: 50px;
    border: none;
    resize: none;
    &:focus {
        outline: none;
    }
`;

const ModalT = styled.article`
    & > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    & > div > div {
        display: flex;
        align-items: center;
    }
    
    & img {
        width: calc(1.275rem + 0.3vw);
        height: calc(1.275rem + 0.3vw);
        cursor: pointer;
        margin: 0 5px;
    }
    & p,
    span {
        font-size: 14px;
        color: #888;
    }
    & .name_ud {
        font-size: 16px;
        margin: 10px 0;
    }
    & .name_ud span {
        cursor: pointer;
    }
    & .name_ud span:first-child::after{
        content: "|";
        padding-left: 8px;
    }
    & .name_ud span:last-child{
        padding-left: 8px;
    }
`;

const ModalM = styled.article`
    & > p {
        margin: 10px 0;
    }
    & > p > span {
        font-weight: bold;
        padding-right: 10px;
    }
    & > div {
        display: flex;
        align-items: center;
    }
`;

const ModalCont = styled.article`
    overflow: auto;
    max-height: 30vh;
    min-height: 15vh;
    & > div {
        margin: 20px 0;
    }
    & ul {
        display: block;
        border-top: 1px solid #ececec;
    }
    & ul > li {
        display: flex;
        margin: 20px 0;
    }
    & .comment_writer {
        padding-right: 20px;
        font-weight: bold;
        flex-shrink: 0;
    }
    & .comment_cont > p {
        padding-bottom: 10px;
    }
    & .comment_cont > div > span {
        font-size: 14px;
        color: #888;
        margin-right: 8px;
    }
    & .comment_cont > div > span:not(:first-child) {
        cursor: pointer;
    }
`;

const ModalFt = styled.form`
    display: flex;
    margin: 20px 0 !important;
    border: none !important;
`;

const Main = () => {
    const navigate = useNavigate();
    const [getList, setGetList] = useState([
        {   
            index : "",
            create_date: "",
            create_user: "",
            photo_url: "",
            photo_name: "",
            photo_date: "",
            photo_place: "",
            used_camera: "",
            used_film: "",
            other_film: "",
            photo_desc: "",
        },
    ]);

    useEffect(() => {
        getLiFunction();
    }, []);

    const getLiFunction = ()=>{
        axios.get(process.env.REACT_APP_ip + "/board").then((res) => {
            setGetList(res.data);
        });
    };

    const [elTarget,setElTarget] = useState({   
            index : "",
            create_date: "",
            create_user: "",
            photo_url: "",
            photo_name: "",
            photo_date: "",
            photo_place: "",
            used_camera: "",
            used_film: "",
            other_film: "",
            photo_desc: "",
        });
    const postUpdate = () => {
       navigate("/write/edit",{state:elTarget});
    };
    
    const postDelete = () => {
        if (window.confirm("삭제하시겠습니까?") === true){
            axios
                .delete(process.env.REACT_APP_ip + `/board?index=${elTarget.index}`)
                .then((res) => {
                    console.log(res);
                    setLgShow(false);
                    alert("삭제되었습니다.");
                    getLiFunction();
                })
                .catch((e) => {
                    console.error(e);
                });
        } else {return};
    };
    const [lgShow, setLgShow] = useState(false);
    const [disabled,setDisabled] = useState(true);
    const comment = useRef() as RefObject<HTMLFormElement>;
    const textarea = useRef() as RefObject<HTMLTextAreaElement>;
    const reviewChk = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.target.value.length < 3 ? setDisabled(true) : setDisabled(false);
    };

    const submitChk = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        setDisabled(true);
    };

    return (
        <>
            <Modal
                size="xl"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Body>
                    <ModalInner>
                        <section>
                            <img
                                src="/image/login_bg.jpg"
                                alt=""
                                width="100%"
                            />
                        </section>
                        <section>
                            <div>
                                <ModalT>
                                    <div className="title_like">
                                        <div>
                                            <h4>{elTarget.photo_name}</h4>
                                            <img
                                                src={"./image/star.svg"}
                                                alt="즐겨찾기 아이콘"
                                            />
                                        </div>
                                        <p>{elTarget.create_date}</p>
                                    </div>
                                    <div className="name_ud">
                                        <p>{elTarget.create_user}</p>
                                        <div>
                                            <span onClick={postUpdate}>
                                                수정
                                            </span>
                                            <span onClick={postDelete}>
                                                삭제
                                            </span>
                                        </div>
                                    </div>
                                </ModalT>
                                <ModalM>
                                    <p>
                                        <span>촬영날짜</span>
                                        {elTarget.photo_date}
                                    </p>
                                    <p>
                                        <span>촬영장소</span>
                                        {elTarget.photo_place}
                                    </p>
                                    <p>
                                        <span>카메라</span>
                                        {elTarget.used_camera}
                                    </p>
                                    <div>
                                        <img
                                            src={
                                                "/image/" +
                                                elTarget.used_film +
                                                ".png"
                                            }
                                            alt="사용 필름 이미지"
                                        />
                                        <p>
                                            {elTarget.used_film !== "other"
                                                ? elTarget.used_film
                                                : elTarget.other_film}
                                        </p>
                                    </div>
                                </ModalM>
                                <ModalCont>
                                    <div>{elTarget.photo_desc}</div>
                                    <ul>
                                        <li>
                                            <p className="comment_writer">
                                                닉네임
                                            </p>
                                            <div className="comment_cont">
                                                <p>댓글 내용</p>
                                                <div>
                                                    <span>2022.11.11</span>
                                                    <span className="comment_update">
                                                        수정
                                                    </span>
                                                    <span className="comment_delete">
                                                        삭제
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </ModalCont>
                            </div>
                            <div>
                                <ModalFt ref={comment}>
                                    <FormControl
                                        ref={textarea}
                                        onChange={reviewChk}
                                        as="textarea"
                                        placeholder="댓글 달기..."
                                    />
                                    <Button
                                        variant="dark"
                                        onClick={submitChk}
                                        disabled={disabled}
                                    >
                                        게시
                                    </Button>
                                </ModalFt>
                            </div>
                        </section>
                    </ModalInner>
                </Modal.Body>
            </Modal>
            <Container>
                <CustomMasonry
                    className="my-masonry-grid mt-4"
                    columnClassName="my-masonry-grid_column"
                    breakpointCols={breakpointColumnsObj}
                >
                    {getList.map((el, i) => {
                        return (
                            <Figure
                                onClick={() => {
                                    setElTarget(el);
                                    setLgShow(true);
                                }}
                                key={i}
                            >
                                <img src="./image/login_bg.jpg" alt="" />
                                <figcaption>{el.photo_date}</figcaption>
                            </Figure>
                        );
                    })}
                </CustomMasonry>
            </Container>
        </>
    );
};

export default Main;