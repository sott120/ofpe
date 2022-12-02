import express, { Request, Response } from 'express';
import db from './db.js';
import cors from 'cors';
import { send } from 'process';
import crypto from 'crypto';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
const __dirname = path.resolve();
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
const SECRET_KEY = process.env.SECRET_KEY as string;

db.connect((err) => {
  if (err) {
    console.log('MySql 연결 실패 : ', err);
  } else {
    console.log('mysql 연결성공');
  }
});

// 전체 게시글 불러오기
app.get('/board', (req, res) => {
  const showQuery = 'SELECT *FROM posting;';
  db.query(showQuery, (err, result) => {
    res.status(200).json(result.reverse());
  });
});

// 게시글 작성
app.post('/board', (req, res) => {
  let { photo_name, photo_date, photo_url, photo_place, used_camera, used_film, other_film, photo_desc } = req.body;
  let writeQuery =
    'INSERT INTO `posting`(create_date,photo_name,photo_date,photo_url,photo_place,used_camera,used_film,other_film,photo_desc) VALUES (curdate(),?,?,?,?,?,?,?,?)';
  db.query(
    writeQuery,
    [photo_name, photo_date, photo_url, photo_place, used_camera, used_film, other_film, photo_desc],
    (err, result) => {
      console.log(err);
      res.status(200).json('등록완료');
    },
  );
});

// 게시글 수정
app.put('/board', (req, res) => {
  let { index, photo_name, photo_date, photo_url, photo_place, used_camera, used_film, other_film, photo_desc } =
    req.body;
  let updateQuery =
    'UPDATE `posting` SET photo_name=?, photo_date=?, photo_url=?, photo_place=?, used_camera=?, used_film=?, other_film=?, photo_desc=? WHERE `index` = ? ';
  db.query(
    updateQuery,
    [photo_name, photo_date, photo_url, photo_place, used_camera, used_film, other_film, photo_desc, index],
    (err, result) => {
      console.log(err);
      res.status(200).json('수정했따');
    },
  );
});

// 게시글 삭제
app.delete('/board', (req, res) => {
  let index = req.query.index;
  let deleteQuery = 'DELETE FROM posting WHERE `index` = ?';
  db.query(deleteQuery, [index], (err, result) => {
    console.log(err);
    res.status(200).json('삭제완료');
  });
});

// 댓글 불러오기
app.get('/board/comment', (req, res) => {
  let post_index = req.query.index;
  console.log(post_index);
  const showQuery = 'SELECT * FROM `comment` WHERE post_index = ?';
  db.query(showQuery, [post_index], (err, result) => {
    console.log(err);
    res.status(200).json(result);
  });
});

// 댓글 작성
app.post('/board/comment', (req, res) => {
  let { post_index, content } = req.body;
  let cmtWriteQuery = 'INSERT INTO `comment`(post_index, content, date) VALUES (?,?,curdate())';
  db.query(cmtWriteQuery, [post_index, content], (err, result) => {
    console.log(err);
    res.status(200).json('댓글등록완료');
  });
});

// 댓글 삭제
app.delete('/board/comment', (req, res) => {
  let index = req.query.index;
  let deleteQuery = 'DELETE FROM `comment` WHERE `index` = ?';
  db.query(deleteQuery, [index], (err, result) => {
    console.log(err);
    res.status(200).json('댓글삭제완료');
  });
});

// 회원가입 아이디 중복검사
app.post('/member/id', (req, res) => {
  let id = req.body.id;
  let idChkQuery = 'SELECT id FROM user WHERE id=?';
  db.query(idChkQuery, [id], (err, result) => {
    if (result.length == 0) {
      res.status(200).json(true);
    } else {
      res.status(200).json(false);
    }
  });
});

// 회원가입 아이디 중복검사
app.post('/member/name', (req, res) => {
  let name = req.body.name;
  let nameChkQuery = 'SELECT name FROM user WHERE name=?';
  db.query(nameChkQuery, [name], (err, result) => {
    if (result.length == 0) {
      res.status(200).json(true);
    } else {
      res.status(200).json(false);
    }
  });
});

// 회원가입
app.post('/member', (req, res) => {
  let { id, name, pw } = req.body;
  const salt = crypto.randomBytes(32).toString('hex');
  const hash = hashTest(pw);
  function hashTest(pw: crypto.BinaryLike) {
    return crypto.pbkdf2Sync(pw, salt, 1, 32, 'sha512').toString('hex');
  }
  let joinQuery = 'INSERT INTO `user` (id, name, pw, salt) VALUES (?,?,?,?)';
  db.query(joinQuery, [id, name, hash, salt], (err, result) => {
    console.log(err);
    res.status(200).json('회원가입완료');
  });
});

// 로그인 아이디 조회
app.post('/login', (req, res) => {
  let id = req.body.id; //로그인 받아온 id
  let pw = req.body.pw; //로그인 받아온 pw
  let idChkQuery = 'SELECT * FROM user WHERE id=?';
  let hashTest = (pw: crypto.BinaryLike, salt: crypto.BinaryLike) => {
    return crypto.pbkdf2Sync(pw, salt, 1, 32, 'sha512').toString('hex');
  };
  db.query(idChkQuery, [id], (err, result) => {
    if (result[0]) {
      let salt = result[0].salt;
      let dbPw = result[0].pw;
      let hash = hashTest(pw, salt);
      //로그인 성공 조건
      if (dbPw === hash) {
        console.log('로그인성공');
        const token = jwt.sign(
          {
            type: 'JWT',
            id: result[0].id,
          },
          SECRET_KEY,
          {
            expiresIn: '15m', // 만료시간 15분
          },
        );
        res.cookie('user', result[0].id);
        res.cookie('token', token);
        res.status(200).json(result);
      } else if (dbPw !== hash) {
        res.status(200).json(false);
      }
    } else if (!result[0]) {
      res.status(200).json(false);
    }
  });
});

app.listen(8080, () => {
  console.log('열림');
});
