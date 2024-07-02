// Cookie 활용

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
//const session = require("express-session");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
  if (req.cookies.userid) {
    res.send(
      `<h2>${req.cookies.userid}님 반갑십니다.<h2><a href="/logout">로그아웃</a>`
    );
  } else {
    res.sendFile(path.join(__dirname, "/index.html"));
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("userid", req.cookies.userid, { httpOnly: true, path: "/" });
  res.redirect("/");
});

app.post("/login", (req, res) => {
  const userid = req.body.userid;
  const pw = req.body.pw;
  console.log(userid, pw);
  if (userid == "unijjj" && pw == "5050") {
    const exp = new Date();
    exp.setMinutes(exp.getMinutes() + 1);
    res.cookie("userid", userid, { exp: exp, httpOnly: true, path: "/" });
    res.json({ msg: "ok" });
    // axios 로 요청된 건 반드시 요청된 곳으로 응답이 가야하기 때문에 res.redirect 는 안쓰는게 좋음
  } else if (userid != "unijjj") {
    res.json({ msg: "없는 아이디인데예!!" });
    // res.json(JSON.stringify({msg: 없는 아이디임ㅗ}));
  } else if (pw != "5050") {
    res.json({ msg: "비밀번호 틀렸는데예!!" });
  }
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "port server opened");
});
