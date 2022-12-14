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

// console.log('토큰 확인');
// console.log(process.env.SECRET_KEY!);

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

//mysql connection 끊김 방지를 위해 1시간마다 쿼리를 날린다.
setInterval(() => {
  db.query('SELECT 1', [], (err, rows, fields) => {
    console.log('커넥션 끊김방지 쿼리');
  });
}, 3600000);

// 토큰 확인 미들웨어
app.use('/api/board', (req, res, next) => {
  let token = req.cookies.token;
  console.log(req.cookies);
  if (typeof token == 'string') {
    jwt.verify(token, process.env.SECRET_KEY!, (error, decoded) => {
      if (error) {
        console.log('토큰이 유효하지 않음');
        res.clearCookie('user');
        res.clearCookie('name');
        res.clearCookie('token');
        res.status(403).send('토큰이 유효하지 않음');
        return;
      } else {
        next();
      }
    });
  } else if (token == undefined) {
    console.log('토큰이 없음');
    res.clearCookie('user');
    res.clearCookie('name');
    res.clearCookie('token');
    res.status(401).send('토큰이 없음');
    return;
  }
});

// 전체 게시글 불러오기
app.get('/api/board', (req, res) => {
  const showQuery = 'SELECT *FROM posting;';
  db.query(showQuery, (err, result) => {
    res.status(200).json(result.reverse());
  });
});

// 특정 작성자 게시글만 불러오기
app.get('/api/board/author', (req, res) => {
  let author = req.query.author;
  const showAQuery = 'SELECT *FROM posting where create_user = ?;';
  db.query(showAQuery, [author], (err, result) => {
    console.log(err);
    res.status(200).json(result.reverse());
  });
});

// 내가 쓴 게시글만 불러오기
app.get('/api/board/my', (req, res) => {
  let myname = req.query.my;
  console.log(myname);
  const showMyQuery = 'SELECT *FROM posting where create_user = ?;';
  db.query(showMyQuery, [myname], (err, result) => {
    console.log(err);
    res.status(200).json(result.reverse());
  });
});

// 좋아요 한 게시글만 불러오기
app.get('/api/board/bookmarks', (req, res) => {
  let myname = req.query.my;
  console.log(myname);
  const showBookmarkQuery = 'SELECT * FROM posting where `index` in (SELECT post_index FROM `like` WHERE name = ? );';
  db.query(showBookmarkQuery, [myname], (err, result) => {
    console.log(err);
    res.status(200).json(result.reverse());
  });
});

// 게시글 작성
app.post('/api/board', (req, res) => {
  let {
    user_id,
    photo_name,
    user_name,
    photo_date,
    photo_url,
    photo_place,
    used_camera,
    used_film,
    other_film,
    photo_desc,
  } = req.body;
  let writeQuery =
    'INSERT INTO `posting`(create_date,user_id,photo_name,create_user,photo_date,photo_url,photo_place,used_camera,used_film,other_film,photo_desc) VALUES (curdate(),?,?,?,?,?,?,?,?,?,?)';
  db.query(
    writeQuery,
    [
      user_id,
      photo_name,
      user_name,
      photo_date,
      photo_url,
      photo_place,
      used_camera,
      used_film,
      other_film,
      photo_desc,
    ],
    (err, result) => {
      console.log(err);
      res.status(200).json('등록완료');
    },
  );
});

// 게시글 수정
app.put('/api/board', (req, res) => {
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
app.delete('/api/board', (req, res) => {
  let index = req.query.index;
  let deleteQuery =
    'DELETE t1, t2, t3 FROM `posting` AS t1 LEFT JOIN `comment` AS t2 ON t1.`index` = t2.post_index LEFT JOIN `like` AS t3 ON t1.`index` = t3.post_index WHERE t1.`index` = ?';
  db.query(deleteQuery, [index], (err, result) => {
    console.log(err);
    res.status(200).json('삭제완료');
  });
});

// 댓글 불러오기
app.get('/api/board/comment', (req, res) => {
  let post_index = req.query.index;
  console.log(post_index);
  const showQuery = 'SELECT * FROM `comment` WHERE post_index = ?';
  db.query(showQuery, [post_index], (err, result) => {
    console.log(err);
    res.status(200).json(result);
  });
});

// 댓글 작성
app.post('/api/board/comment', (req, res) => {
  let { post_index, user_id, user_name, content } = req.body;
  let cmtWriteQuery = 'INSERT INTO `comment`(post_index, id, name, content, date) VALUES (?,?,?,?,curdate())';
  db.query(cmtWriteQuery, [post_index, user_id, user_name, content], (err, result) => {
    console.log(err);
    res.status(200).json('댓글등록완료');
  });
});

// 댓글 삭제
app.delete('/api/board/comment', (req, res) => {
  let index = req.query.index;
  let deleteQuery = 'DELETE FROM `comment` WHERE `index` = ?';
  db.query(deleteQuery, [index], (err, result) => {
    console.log(err);
    res.status(200).json('댓글삭제완료');
  });
});

// 좋아요 불러오기
app.get('/api/board/like', (req, res) => {
  let index = req.query.index;
  let name = req.query.name;
  console.log(index, name);
  let showLikeQuery = 'SELECT * FROM `like` WHERE `post_index` = ? AND `name` = ?';
  db.query(showLikeQuery, [index, name], (err, result) => {
    console.log(err);
    res.status(200).json(result);
  });
});

// 좋아요 추가
app.post('/api/board/like', (req, res) => {
  let { name, post_index } = req.body;
  let insertLikeQuery = 'INSERT INTO `like`(name,post_index) VALUES (?,?)';
  db.query(insertLikeQuery, [name, post_index], (err, result) => {
    console.log(err);
    res.status(200).json('좋아요완료');
  });
});

// 좋아요 취소
app.delete('/api/board/like', (req, res) => {
  let index = req.query.index;
  let name = req.query.name;
  let deleteLikeQuery = 'DELETE FROM `like` WHERE `post_index` = ? AND `name` = ?';
  db.query(deleteLikeQuery, [index, name], (err, result) => {
    console.log(err);
    res.status(200).json('좋아요취소');
  });
});

// 회원가입 아이디 중복검사
app.post('/api/member/id', (req, res) => {
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
app.post('/api/member/name', (req, res) => {
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
app.post('/api/member', (req, res) => {
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
app.post('/api/login', (req, res) => {
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
        const token = jwt.sign(
          {
            alg: 'HS256',
            type: 'JWT',
            id: result[0].id,
          },
          process.env.SECRET_KEY!,
          {
            expiresIn: '60m', // 만료시간 60분
          },
        );
        res.cookie('user', result[0].id);
        res.cookie('name', result[0].name);
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json(result);
      } else if (dbPw !== hash) {
        res.status(200).json(false);
      }
    } else if (!result[0]) {
      res.status(200).json(false);
    }
  });
});

//게스트 로그인한척 하기
app.post('/api/login/guest', (req, res) => {
  let id = req.body.id;
  let name = req.body.name;
  let guestObj = [
    {
      id: id,
      name: name,
    },
  ];
  const token = jwt.sign(
    {
      alg: 'HS256',
      type: 'JWT',
      id: id,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: '3h', // 만료시간 3시간
    },
  );
  res.cookie('user', id);
  res.cookie('name', name);
  res.cookie('token', token, { httpOnly: true });
  res.status(200).json(guestObj);
});

//로그아웃
app.get('/api/logout', (req, res) => {
  res.clearCookie('user');
  res.clearCookie('name');
  res.clearCookie('token');
  res.status(200).json('로그아웃 성공');
});

app.listen(8080, () => {
  console.log('열림');
});
