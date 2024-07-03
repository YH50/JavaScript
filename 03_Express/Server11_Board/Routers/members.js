const express = require("express");
const router = express.Router();
const path = require("path");
const mysql = require("mysql2/promise");

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "adminuser",
//   database: "board",
// });

async function getConnection() {
  let connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "adminuser",
    database: "board",
  });
  return connection;
}

router.post("/login", async (req, res, next) => {
  //   const userid = req.body.userid;
  //   const pwd = req.body.pwd;
  const { userid, pwd } = req.body; // 구조분해
  const sql = "select * from member where userid = ?";
  try {
    const connection = await getConnection();
    const [rows, fields] = await connection.query(sql, [userid]);
    if (rows.length == 1) {
      if (rows[0].pwd == pwd) {
        const uniqInt = Date.now();
        req.session[uniqInt] = rows[0];
        res.cookie("session", uniqInt, { httpOnly: true, path: "/" });
        res.json({ msg: "ok" });
      } else {
        res.json({ msg: "비번 틀렸는데예!" });
      }
    } else {
      res.json({ msg: "아이디가 없는데예!!" });
    }
  } catch (err) {
    next(err);
  }
  /*
  connection.query(sql, [userid], (error, rows) => {
    // sql : 실행될 sql 문장
    // [userid] : ? 에 대응되는 값을 저장한 변수. 여러개일 때 콤마로 구분하여 나열
    // rows : 검색결과(레코드는 개체, 객체들은 배열 형태로 저장) , 에러 내용이 저장되면서 익명함수가 실행됨
    if (error) {
      next(error);
    } else {
      if (rows.length == 1) {
        if (rows[0].pwd == pwd) {
          const uniqInt = Date.now();
          req.session[uniqInt] = rows[0];
          res.cookie("session", uniqInt, { httpOnly: true, path: "/" });
        } else {
          res.json({ msg: "비번 틀렸는데예!" });
        }
      } else {
        res.json({ msg: "아이디가 없는데예!!" });
      }
    }
  });
  */
});

router.get("/joinForm", (req, res) => {
  res.sendFile(path.join(__dirname, "/..", "/views/joinForm.html"));
});

router.post("/idcheck", async (req, res) => {
  const userid = req.body.userid;
  const sql = "select * from member where userid = ?";
  try {
    const connection = await getConnection();
    const [rows, fields] = await connection.query(sql, [userid]);
    if (rows.length > 0) {
      res.json({ id: "1" });
    } else {
      res.json({ id: "0" });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/join", async (req, res) => {
  const { userid, name, pwd, email, phone } = req.body;
  try {
    const sql =
      "insert into member (userid, pwd, name, email, phone) values(?,?,?,?,?)";
    const connection = await getConnection();
    const [result, fields] = await connection.query(sql, [
      userid,
      pwd,
      name,
      email,
      phone,
    ]);
    console.log(result);
    console.log(fields);
    res.json({ msg: "회원가입 끝났으요~ 로그인하이소~" });
  } catch (err) {
    res.json({ msg: "오류 났으니까 알아서 하소 ㅅㄱ" });
  }
});

router.get("/logout", (req, res) => {
  delete req.session[req.cookies.session];
  res.clearCookie("session", req.cookies.session, {
    httpOnly: true,
    path: "/",
  });
  res.redirect("/");
});

router.get("/updateForm", (req, res) => {
  res.sendFile(path.join(__dirname, "/..", "/views/updateMemberForm.html"));
});

router.post("/update", async (req, res, next) => {
  const { userid, pwd, name, phone, email } = req.body;
  const sql =
    "update member set pwd=?, name=?, phone=?, email=? where userid=?";
  try {
    const connection = await getConnection();
    const [result, fields] = await connection.query(sql, [
      pwd,
      name,
      phone,
      email,
      userid,
    ]);
    req.session[req.cookies.session] = { userid, pwd, name, phone, email };
    res.send("ok");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
