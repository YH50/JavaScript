const express = require("express");
const path = require("path");

const app = express();
app.set("port", process.env.PORT || 3000); //process.env.PORT : 시스템 포트 번호

app.get("/", (req, res) => {
  // http 서버에서는 파일을 읽어서 내용을 전송하는 반면
  // express 서버에서는 그 파일을 직접 전송함

  // http 서버는 상대 경로로 파일을 선택하는 반면
  // express 서버는 절대 경로로 파일을 선택함
  res.sendFile(path.join(__dirname, "/index.html"));
  // __dirname : 현재 파일의 경로
  // __filename : 현재 작성 중인 파일의 이름
  // path.join() : 콤마로 구분하여 경로/경로, 경로/파일 간의 조합을 시켜주는 함수
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "port server opened");
});
