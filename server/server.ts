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

app.get('/',(req,res) =>{
    res.send('ㅋㅋ')
})

app.listen(8080,()=>{
    console.log("열림zzz")
});
