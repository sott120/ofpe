import express, { Request, Response } from 'express';
import db from './db.js';
import cors from 'cors';
import { send } from 'process';

const app = express();
app.use(cors());
app.use(express.json());

db.connect((err) => {
  if (err) {
    console.log('MySql 연결 실패 : ', err);
  } else {
    console.log('mysql 연결성공');
  }
});

app.post('/api/test', (req, res) => {
  console.log(req.body);
  db.query('SELECT * FROM user', [], (err, result) => {
    res.status(200).json(result);
  });
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
  let { photo_name, photo_date, photo_place, used_camera, used_film, other_film, photo_desc } = req.body;
  let writeQuery =
    'INSERT INTO `posting`(create_date,photo_name,photo_date,photo_place,used_camera,used_film,other_film,photo_desc) VALUES (curdate(),?,?,?,?,?,?,?)';
  db.query(
    writeQuery,
    [photo_name, photo_date, photo_place, used_camera, used_film, other_film, photo_desc],
    (err, result) => {
      console.log(err);
      res.status(200).json('등록완료');
    },
  );
});

// 게시글 수정
app.put('/board', (req, res) => {
  let { index, photo_name, photo_date, photo_place, used_camera, used_film, other_film, photo_desc } = req.body;
  let updateQuery =
    'UPDATE `posting` SET photo_name=?, photo_date=?, photo_place=?, used_camera=?, used_film=?, other_film=?, photo_desc=? WHERE `index` = ? ';
  db.query(
    updateQuery,
    [photo_name, photo_date, photo_place, used_camera, used_film, other_film, photo_desc, index],
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
    res.status(200).json('삭제완료');
  });
});

// 회원가입
app.post('/member', (req, res) => {
  let { id, name, pw, salt } = req.body;
  let joinQuery = 'INSERT INTO `user` (id, name, pw, salt) VALUES (?,?,?,?)';
  db.query(joinQuery, [id, name, pw, salt], (err, result) => {
    console.log(err);
    res.status(200).json('회원가입완료');
  });
});

// 회원가입 아이디 중복검사
app.post('/member/id', (req, res) => {
  let id = req.body.id;
  let idChkQuery = 'select id from user where id=?';
  db.query(idChkQuery, [id], (err, result) => {
    console.log(result);
    if (result.length == 0) {
      console.log('중복없음');
    } else {
      console.log('중복있음');
    }
  });
});

app.listen(8080, () => {
  console.log('열림zzz');
});
