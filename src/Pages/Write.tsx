import styled from "styled-components";
import { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Container } from "react-bootstrap";

const Write = () => {
    return (
        <Container>
            <Form className="mt-5">
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>사진을 한 장 골라주세요</Form.Label>
                    <Form.Control type="file" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>작품 이름</Form.Label>
                    <Form.Control type="text" placeholder="작품 이름" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>촬영일</Form.Label>
                    <Form.Control type="date" placeholder="촬영일" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>촬영장소</Form.Label>
                    <Form.Control type="text" placeholder="촬영장소" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>카메라 기종</Form.Label>
                    <Form.Control type="text" placeholder="카메라 기종" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>사용한 필름</Form.Label>
                    <Form.Select>
                        <option value="null">필름 선택</option>
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
                        <option value="null">직접 작성하기</option>
                    </Form.Select>
                    <Form.Control type="text" placeholder="필름 이름을 적어주세요" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>하고싶은 말</Form.Label>
                    <Form.Control
                        as="textarea"
                        placeholder="하고 싶은 말을 적어주세요"
                    />
                </Form.Group>
                <Button variant="dark" type="submit">
                    전시하기
                </Button>
            </Form>
        </Container>
    );
}

export default Write;