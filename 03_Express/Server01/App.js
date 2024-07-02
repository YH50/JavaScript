// 서버 프로그래밍의 시작 부분

// 서버 운영을 위해서 expresss 모듈을 import 하여 객체 변수에 저장

const express = require("express");
const app = express(); // express() 함수를 이용하여 서버 운영관련 객체를 변수에 저장
// 익스프레스 서버는 이것만으로도 http 서버의 createServer 와 같은 동작이 되었다고 할 수 있음

app.set("port", 3000);
// app.set(); >> 서버 객체의 필드 변수를 추가하여 사용할 수 있음
// 추가되는 변수는 현재 파일에서만 사용되고, 서버 종료 시 소멸됨
// console.log(app.get("port"));

app.get("/", (req, res) => {
  res.send("<h1>Yo tengo hambre</h1>");
});

// app.get() 같은 함수 : "라우터" 라고 칭함

app.get("/about", (req, res) => {
  res.send("<h1>Y tu?</h1>");
});

app.listen(app.get("port"), () => {
  console.log("port 3000 opened");
});

// express Server 구동 순서 ------------------------------------------------------
/*
1. npm init
2. npm i express
3. npm i nodemon : 개발환경용이므로 필수는 아님
4. app.js / index.js / main.js 에 지정한 파일(서버의 시작 파일)을 제작
5. package.json 의 scripts 에 "start": "nodemon app" 추가
6. npm app / npm run start(npm start) 로 서버를 시작

nodemon 사용 시 좋은 점
1. 서버 구동 및 운용에 발생하는 모든 과정을 로그에 보여줌
2. 에러 수정 쉬움, 일정 시간이 지나거나 주요 파일이 저장되면 서버가 재시작되므로 수정사항이 서버 수동 재시작없이 적용 가능
*/
