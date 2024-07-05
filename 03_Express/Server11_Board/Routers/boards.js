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
    database: "board",
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

const upObj = multer(); // 껍데기 객체 생성
router.post("/writeBoard", upObj.single("image"), async (req, res) => {
  const connection = await getConnection();
  const { userid, pass, email, title, content, image, savefilename } = req.body;
  console.log(req.body);
  const sql =
    "insert into board(userid, pass, email, title, content, image, savefilename) values (?,?,?,?,?,?,?)";
  try {
    const [result, field] = await connection.query(sql, [
      userid,
      pass,
      email,
      title,
      content,
      image,
      savefilename,
    ]);
    res.send("ok");
  } catch (err) {
    next(err);
  }
});

router.post("/updateBoard", upObj.single("image"), async (req, res) => {
  const connection = await getConnection();
  const { title, content, img, savefilename } = req.body;
  const num = req.session.boardnum;
  const sql =
    "update board set title=?, content=?, image=?, savefilename=? where num=?";
  try {
    const [result, field] = await connection.query(sql, [
      title,
      content,
      img,
      savefilename,
      num,
    ]);
  } catch (err) {
    console.error(err);
  }
  res.send("ok");
});

router.post("/imageup", uploadObj.single("image"), (req, res) => {
  console.log("filename : ", req.file.originalname);
  console.log("savefilename : ", req.file.filename);
  res.json({ image: req.file.originalname, savefilename: req.file.filename });
});

router.get("/boardList", (req, res) => {
  res.sendFile(path.join(__dirname, "/..", "/views/boardList.html"));
});

router.get("/boards", async (req, res, next) => {
  const sql = "select * from board order by num desc";
  try {
    const connection = await getConnection();
    const [rows, field] = await connection.query(sql);
    // rows 에는 하나의 레코드가 하나의 객체 형태로, 그리고 여러 레코드는 객체를 구성하는 배열 형태로 조회
    // [{num:1, writer:'', title:"ㅎㅇ" ...etc},{}, {},{} ...]
    res.send(rows);
  } catch (err) {
    next(err);
  }
});

router.get("/boardview/:boardnum", async (req, res, next) => {
  const sql = "update board set readcount = readcount + 1 where num=?";
  req.session.boardnum = req.params.boardnum;
  try {
    const connection = await getConnection();
    const [result, fields] = await connection.query(sql, [req.params.boardnum]);
    res.sendFile(path.join(__dirname, "/..", "/views/boardView.html"));
  } catch (err) {
    next(err);
  }
});

router.get("/boardviewWoCnt", (req, res) => {
  res.sendFile(path.join(__dirname, "/..", "/views/boardView.html"));
});

router.get("/getBoard", async (req, res) => {
  const num = req.session.boardnum;
  const sql = "select * from board where num=?";
  try {
    const connection = await getConnection();
    const [rows, fields] = await connection.query(sql, [num]);
    res.send(rows[0]);
  } catch (err) {
    next(err);
  }
});

router.get("/boardWriteForm", (req, res) => {
  res.sendFile(path.join(__dirname, "/..", "/views/boardWriteForm.html"));
});

router.get("/updateBoardForm", (req, res) => {
  res.sendFile(path.join(__dirname, "/..", "/views/boardUpdateForm.html"));
});

router.get("/getReplys", async (req, res) => {
  const boardnum = req.session.boardnum;
  try {
    const connection = await getConnection();
    const sql = "select * from reply where boardnum=? order by replynum desc  ";
    const [rows, fields] = await connection.query(sql, [boardnum]);
    res.send(rows);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/insertReply", async (req, res, next) => {
  const { userid, boardnum, content } = req.body;
  try {
    const connection = await getConnection();
    const sql = "insert into reply(userid, boardnum, content) values(?,?,?)";
    const [result, fields] = await connection.query(sql, [
      userid,
      boardnum,
      content,
    ]);
    res.send("ok");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete("/deleteReply/:replynum", async (req, res, next) => {
  try {
    const connection = await getConnection();
    const sql = "delete from reply where replynum=?";
    const [result, fields] = await connection.query(sql, [req.params.replynum]);
  } catch (err) {
    console.error(err);
    next(err);
  }
  res.send("ok");
});

module.exports = router;
