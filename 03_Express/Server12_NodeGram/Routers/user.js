const express = require("express");
const router = express.Router();
const path = require("path");
const bcrypt = require("bcrypt");
const mysql = require("mysql2/promise");
const { log } = require("console");

async function getConnection() {
  let connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "adminuser",
    database: "nodegram",
  });
  return connection;
}

router.post("/login", async (req, res) => {
  const { email, pwd } = req.body;
  const sql = "select * from user where email=?";
  try {
    const connection = await getConnection();
    const [rows, field] = await connection.query(sql, [email]);
    if (rows.length >= 1) {
      const result = await bcrypt.compare(pwd, rows[0].pwd); // 암호화된 암호값을 원래 값이랑 비교
      if (result) {
        const uniqInt = Date.now();
        req.session[uniqInt] = rows[0];
        res.cookie("session", uniqInt, { httpOnly: true, path: "/" });
        res.json({ msg: "ok" });
        console.log("login success");
      } else {
        res.json({ msg: "비밀번호 틀렸심더!!" });
      }
    } else {
      res.json({ msg: "아이디가 없심더!!" });
    }
  } catch (err) {
    next(err);
  }
});

router.get("/joinform", (req, res) => {
  res.sendFile(path.join(__dirname, "/..", "/views/joinform.html"));
});

router.post("/join", async (req, res, next) => {
  const { email, pwd, nick } = req.body;
  console.log(req.body);
  try {
    const connection = await getConnection();

    let sql = "select * from user where email=?";
    const [rows1, field1] = await connection.query(sql, [email]);
    sql = "select * from user where nickname=?";
    const [rows2, field2] = await connection.query(sql, [nick]);
    if (rows1.length >= 1) {
      res.json({ msg: "이메일 중복이다 마!!" });
    } else if (rows2.length >= 1) {
      res.json({ msg: "닉네임 중복이다 마!!" });
    } else {
      sql = "insert into user(email, nickname, pwd) values (?,?,?)";
      const hash = await bcrypt.hash(pwd, 12); //pwd 암호화
      const result = await connection.query(sql, [email, nick, hash]);
      res.json({ msg: "ok" });
    }
  } catch (err) {
    next(err);
  }
});

router.get("/getLoginUser", (req, res) => {
  const loginUser = req.session[req.cookies.session];
  res.send(loginUser);
});

module.exports = router;
