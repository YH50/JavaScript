const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const mysql = require("mysql2/promise");

async function getConnection() {
  let connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "adminuser",
    database: "nodegram",
  });
  return connection;
}

try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어서 폴더를 생성함.");
  fs.mkdirSync("uploads");
}

const uploadObj = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads/");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

//=====================================================================
router.get("/mainlist", (req, res) => {
  res.sendFile(path.join(__dirname, "/..", "/views/mainlist.html"));
});

router.get("/feedWriteForm", (req, res) => {
  res.sendFile(path.join(__dirname, "/..", "/views/feedWriteForm.html"));
});

router.post("/imgup", uploadObj.single("img"), (req, res) => {
  console.log("filename : ", req.file.originalname);
  console.log("savefilename : ", req.file.filename);
  res.json({ image: req.file.originalname, savefilename: req.file.filename });
});

const obj = multer();
router.post("/writeFeed", obj.single("img"), async (req, res, next) => {
  const { content, writer, image, savefilename } = req.body;
  try {
    // feed 테이블에 레코드 추가
    const connection = await getConnection();
    let sql =
      "insert into feed(content, image, savefilename, writer) values(?,?,?,?)";
    const [result, field] = await connection.query(sql, [
      content,
      image,
      savefilename,
      writer,
    ]);
    feedid = result.insertId;
    console.log(`feedid : ${feedid}`);

    // content 에서 해시태그를 분리
    const hashtags = content.match(/(?<=#)[^\s#]+/g);
    console.log(`Hashtags : ${hashtags}`);
    if (hashtags) {
      hashtags.map(async (tag, idx) => {
        console.log(`-----------tag : ${tag}---------------`);
        // tag 에 담긴 단어가 hashtag 테이블에 존재하는지를 검색
        sql = "select * from hashtag where word=?";
        let [rows, field] = await connection.query(sql, [tag]);
        let tagid = "";
        if (rows.length >= 1) {
          // 이미 존재하는 해시태그라면 그 word 의  id만 추출함
          tagid = rows[0].id;
        } else {
          sql = "insert into hashtag(word) values(?)";
          let [result2, field] = await connection.query(sql, [tag]);
          tagid = result2.insertId;
        }
        console.log(`태그 아이디 :" ${tagid}`);

        // hash_feed 테이블에 피드 아이디와 태그 아이디로 레코드 추가
        sql = "insert into hash_feed(feed_id, hash_id) values(?,?)";
        let [result3, field3] = await connection.query(sql, [feedid, tagid]);
      });
      res.send("oo");
    }
  } catch (err) {
    next(err);
  }
});

router.get("/getFeedList", async (req, res, next) => {
  try {
    const connection = await getConnection();
    const sql = "select * from feed order by id desc";
    const [rows, fields] = await connection.query(sql);
    res.send(rows);
  } catch (err) {
    next(err);
  }
});

router.post('/search', async(req, res, next)=>{
  const {word} = req.body;
  console.log(word);
  try{
    const connection = await getConnection();
    // word 를 hashTag 테이블에서 검색
   let sql = 'select * from hashtag where word=?';
   let [rows, fields] = await connection.query(sql, [word]);
   if(rows.length >= 1){
     // 검색된 word 의 hashTag 테이블의 hash_id 로 hash_feed 테이블에서 검색
     // 검색된 feed_id 로 feed 테이블 검색
     let wordid = rows[0].id;
     sql = 'select * from feed where id in(select feed_id from hash_feed where hash_id=?) order by id desc';
     let [rows2, fields2] = await connection.query(sql, [wordid]);
     if(rows2.length >= 1 ){
      // 검색된 feed 들을 res 로 전송
      res.send(rows2);
     }else{
      console.log(1);
      res.send([]);
     }
     // 검색된 feed 들을 res 로 전송
    }else{
      console.log(2);
      res.send([]);
    } 

  }catch(err){
    next(err);
  }
})

module.exports = router;
