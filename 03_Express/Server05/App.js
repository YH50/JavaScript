const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();

app.set("port", process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cookie-Parser 사용을 위한 설정
app.use(cookieParser());

// Session 활용을 위한 설정
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "abcd", // 암호화 코드
  })
);

app.get("/", (req, res) => {
  const name = req.cookies.name;
  if (name) {
    res.send(
      `<h2>${decodeURIComponent(
        req.cookies.name
      )}님 반갑십니다</h2><a href="/logout">로그아웃</a>`
    );
  } else {
    res.sendFile(path.join(__dirname, "/index.html"));
  }
});

app.get("/logout", (req, res) => {
  // 쿠키 삭제
  res.clearCookie("name", encodeURIComponent(req.cookies.name), {
    httpOnly: true,
    path: "/",
  });
  res.redirect("/");
});

app.post("/login", (req, res) => {
  const name = req.body.name;
  const exp = new Date();
  exp.setMinutes(exp.getMinutes() + 1);
  // name 이라는 이름으로 전송된 이름을 쿠키에 저장.
  res.cookie("name", encodeURIComponent(name), {
    exp: exp,
    httpOnly: true,
    path: "/",
  });
  res.redirect("/");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "port server opened");
});
