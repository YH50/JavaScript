const express = require("express");
const router = express.Router();
const path = require("path");
const bcrypt = require("bcrypt");
const mysql = require("mysql2/promise");
const { log } = require("console");
const passport = require("passport");

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

router.get("/getLoginUser", async (req, res, next) => {
  const loginUser = req.session[req.cookies.session];
  console.log(loginUser);
  try {
    const connection = await getConnection();
    // 내가 팔로우 하는 유저들 : followings
    // follow_from 에서 나를 조회하여 follow_to 들을 추출함
    let sql = "select * from follow where follow_from=?";
    let [rows, fields] = await connection.query(sql, [loginUser.nickname]);
    // rows 가 원래 배열이었기 때문에 각 요소들로 실행되고 리턴된 데이터로 다시 배열이 구성되고
    // rows : {follow_from:값, follow_to:값} 들로 구성된 객체 배열
    // 그 결과는 followings 변수에 저장됨
    let followings = rows.length >= 1 ? rows.map((row) => row.follow_to) : [];
    //console.log(rows);
    //console.log(followings);

    sql = "select * from follow where follow_to=?";
    let [rows2, fields2] = await connection.query(sql, [loginUser.nickname]);
    let followers = rows2.length >= 1 ? rows.map((row) => row.follow_from) : [];

    res.json({
      loginUser: loginUser,
      followers: followers,
      followings: followings,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/logout", (req, res) => {
  if(req.cookies.session){
    delete req.session[req.cookies.session];
    res.clearCookie("session", req.cookies.session, {
      httpOnly: true,
      path: "/",
    });
  }else{
    req.session.destroy();
  }
  res.redirect("/feed/mainlist");
});

router.post("/follow", async (req, res, next) => {
  const { follow_from, follow_to } = req.body;
  try {
    const connection = await getConnection();
    let sql = "select * from follow where follow_from=? and follow_to=?";
    let [rows, field1] = await connection.query(sql, [follow_from, follow_to]);
    if (rows.length >= 1) {
      res.send("no");
    } else {
      sql = "insert into follow(follow_from, follow_to) values(?,?)";
      let [result, fields2] = await connection.query(sql, [
        follow_from,
        follow_to,
      ]);
      res.send("ok");
    }
  } catch (err) {
    next(err);
  }
});

router.post('/unfollow', async(req, res, next)=>{
  const {follow_from, follow_to} = req.body;
  try{
    const connection = await getConnection();
    let sql = 'delete from follow where follow_from=? and follow_to=?';
    let [result, fields] = await connection.query(sql, [follow_from, follow_to]);
    res.send('ok');
  }catch(err){
    next(err);
  }
});

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback',
  passport.authenticate("kakao", {
    failureRedirect: '/main',   // 인증&회원가입 및 로그인 실패 시 이동할 주소
  }),
  (req, res)=>{
    const uniqInt = Date.now();
    req.session[uniqInt] = req.user;
    res.cookie('session', uniqInt, {httpOnly: true, path: '/'});
    res.redirect("/feed/mainlist");   //  성공 시 이동할 주소
  }
);

module.exports = router;
