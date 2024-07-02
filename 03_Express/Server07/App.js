// Session 활용

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
dotenv.config();

app.use(cookieParser());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET, // session 값 암호 코드
  })
);
app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
  // if(req.cookies['session'])
  if (req.cookies.session) {
    res.send(
      `<h2>${
        req.session[req.cookies.session]
      }님 어서오이소</h2><a href='/logout'>로그아웃</a>`
    ); //userid 얻어내는 키워드
  } else {
    res.sendFile(path.join(__dirname, "/index.html"));
  }
});

app.get("/logout", (req, res) => {
  delete req.session[req.cookies.session]; // session 일부 항목 삭제
  // req.session[req.cookies.session]=null;       // 이하 동일
  // req.session[req.cookies.session]='';       // 이하 동일
  res.clearCookie("session", req.cookies.session, {
    httpOnly: true,
    path: "/",
  });
  res.redirect("/");
  // req.session.destroy(
  //        function(){
  //            req.session;
  // });
  //                >> Session 전체 삭제
});

app.post("/login", (req, res) => {
  const userid = req.body.userid;
  const pw = req.body.pw;
  if (userid == "yh50" && pw == "0000") {
    // 고유키를 하나 발생시켜서 세션에 저장할 키값으로 사용해서 userid 를 저장함
    // 그리고 쿠키에 고유키를 session 이라는 이름으로 저장

    // express 서버에서 session 의 접근 : 쿠키와 유사하게 req.session 으로 접근
    // 저장 형태 = 키:value 형태의 객체형으로 여러 값들을 저장하고 유지시킬 수 있음
    // 지우거나 서버가 종료될 때까지 or 제한 수명이 다할 때까지 유지 가능.

    // 고유 키 하나 생성하기
    const uniqInt = Date.now(); // 현재시간 > 밀리초
    // 고유 키를 저장키 값으로 하여 userid 를 세션에 저장.
    // req.session.123431   >> X
    req.session[uniqInt] = userid;

    // 고유 키 : 쿠키에 저장    >> 저장 이름 'session'
    res.cookie("session", uniqInt, { httpOnly: true, path: "/" });
    // exp. 가 없는 쿠키는 브라우저가 닫힐때까지가 수명.

    res.json({ msg: "ok" });
  } else if (userid != "yh50") {
    res.json({ msg: "없는 아이디인데예!" });
  } else if (pw != "0000") {
    res.json({ msg: "비밀번호 틀렸는데예!" });
  }
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "port server opened");
});
