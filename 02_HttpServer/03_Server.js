// 03_Server.js

const http = require("http");
const fs = require("fs").promises;

http
  .createServer(async (req, res) => {
    if (req.method == "GET") {
      if (req.url === "/") {
        const data = await fs.readFile("./03_index.html");
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        return res.end(data); // 더 이상 아래 부분 실행은 하지 않게끔 return으로 막기
      }
    } else if (req.method == "POST") {
      if (req.url === "/user") {
        req.on("data", (data) => {
          let body = data.toString();
          console.log(body);
          let { userid } = JSON.parse(body);
          console.log(userid);
        });
      }
    }
  })
  .listen(3000, () => {
    console.log("3000포트에서 서버 대기중");
  });
