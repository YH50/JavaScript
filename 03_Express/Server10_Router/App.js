const express = require("express");
const app = express();
app.set("port", process.env.PORT || 3000);

/*
app.get("/", (req, res) => {
  res.send("<h1>Router 학습</h1>");
});
*/

// 외부에 생성되고 클라이언트 요청에 응답할 수 있는 router 들을 갖고 있는 파일을 require 함
const indexRouter = require("./Routers");
// 어느 폴더이든 간에 그 안의 index.js 는 파일 이름을 쓰지 않아도 index.js 가 require 되는 걸로 인식함
app.use("/", indexRouter); // >> '/'로 시작하는 모든 요청은 indexRouter 로 연결

// ex) 요청 : http://localhost:3000/about
// >>>  indexRouter 내의 router.get('/about', (req, res)=>{}) 와 연결

const userRouter = require("./Routers/user");
app.use("/user", userRouter);
// ex) 요청 : http://localhost:3000/user/search
// >>>  userRouter 내의 '/search' 와 연결

// ===================서버 오픈 Terminal 창=======================================
app.listen(app.get("port"), () => {
  console.log(app.get("port"), "Server opened");
});
