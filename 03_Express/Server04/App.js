const express = require("express");
const path = require("path");

const app = express();
app.set("port", process.env.PORT || 3000); //process.env.PORT : 시스템 포트 번호

// 파라미터와 json 형식의 사용을 위한 설정
// >> 전달받는 파라미터를 json 객체로 바로 사용할 수 있게 하는 설정
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.post("/login", (req, res) => {
  const name = req.body.name;
  console.log(name);
  const pwd = req.body.pwd;
  console.log(pwd);
  console.log(req.body);

  res.redirect("/");
});

// app.get("/category/boots", (req, res) => {
//   res.send("<h2>");
// });

// url의 일부 값을 저장할 변수로 라우터를 구성함
// kind : Wild Card Character
app.get("/category/:kind", (req, res) => {
  res.send(`<h2>Hola Wild Card Char ${req.params.kind}<h2>`);
});

// url 에 파라미터를 태워서 보내느 예시
// 와일드카드 키워드를 사용한 라우터는 범위가 넓기 때문에 가능한 아래쪽 위치,
// 명확한 구분은 먼저 실행되게끔 하고 해당 라우터가 없을 때 실행되게 하는 것이 효과적임.

// ===================================================================
app.listen(app.get("port"), () => {
  console.log(app.get("port"), "port server opened");
});
