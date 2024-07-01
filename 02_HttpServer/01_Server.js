// 01_Server.js

// Node.js 에 포함된 함수, 기능과 문법을 이용하여 웹 호스팅을 할 수 있는 서버를 구축함
// Node 가 제공하는 라이브러리 중 서버 구축에 필요한 기능과 함수를 담고 있는 http 모듈(객체)을 require 함
const http = require("http");
// http 모듈의 내용을 불러와서 http라는 변수에 저장하여 사용함.
// 객체 형식으로 불러와서 저장한 형태이므로 http.함수명(), http.변수명 처럼 사용함

// http.createServer((request, response)=>{});
// createServer 함수 : Node.js 자바스크립트로 만든 http 서버가 설정 & 실행되게 하는 함수
// (request, response)=>{} : 서버에 클라이언트가 요청이 있을 때 실행할 명령들이 들어감

const server01 = http.createServer((req, res) => {
  // req : 요청 수신, res : 응답 송신
  // req에 클라이언트로부터 요청이 들어오면 res로 응답
  res.write("<h1>Day6</h1>");
  res.end("<h2>Welcome To The Show</h2>");
});

// 서버 오픈
//server01.listen(3000, () => {
//   console.log("3000포트에서 서버가 오픈됨"); // 3000 : 포트 번호, 익명함수 : 서버 오픈과 동시에 실행할 명령 포함
// });
// 서버 변수를 사용하지 않은 간단한 표현 예) : http.createServer((req, res)=>{}).listen();

server01.listen(3000);
server01.on("listening", () => {
  console.log("3000포트에서 서버 시작");
});
server01.on("error", (error) => {
  console.error(error);
});

const server02 = http.createServer((req, res) => {
  res.write("<h1>Come On You Spurs<h1>");
  res.end("<h2>Heung-min SON<h2>");
});
server02.listen(3001, () => {
  console.log("3001포트에서 서버 오픈 완료");
});
