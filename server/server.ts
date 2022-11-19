import express, { Request, Response } from "express";
import db from "./db.js";
import cors from "cors";
import { send } from "process";

const app = express();
app.use(cors())
app.use(express.json())

db.connect((err)=>{
    if(err){ console.log('MySql 연결 실패 : ',err)} else {
        console.log("mysql 연결성공")
    }
})

app.post('/api/test', (req,res) => {
    console.log(req.body);
    db.query('SELECT * FROM user',[],(err,result)=>{
        res.status(200).json(result)
    })
})

app.get("/board", (req, res) => {
    const showQuery = "SELECT *FROM posting;";
    db.query(showQuery, (err, result) => {
        res.status(200).json(result.reverse());
    });
});



app.post('/board',(req,res) =>{
    let { photo_name, photo_date, photo_place, used_camera, used_film, other_film, photo_desc } =
        req.body;
    let writeQuery =
        "INSERT INTO `posting`(create_date,photo_name,photo_date,photo_place,used_camera,used_film,other_film,photo_desc) VALUES (curdate(),?,?,?,?,?,?,?)";
    db.query(
        writeQuery,
        [
            photo_name,
            photo_date,
            photo_place,
            used_camera,
            used_film,
            other_film,
            photo_desc,
        ],
        (err, result) => {
            console.log(err);
            res.status(200).json("등록완료");
        }
    );
    
});

app.delete("/board", (req, res) => {
    let index = req.query.index;
    let deleteQuery = "DELETE FROM posting WHERE (`index` = ?)";
    db.query(deleteQuery, [index], (err, result) => {
        console.log(err);
        res.status(200).json("삭제완료");
    });
});

app.listen(8080,()=>{
    console.log("열림zzz")
});
