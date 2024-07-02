// 04_Server.js

const http = require("http");
const fs = require("fs").promises;

const users = {};

http
  .createServer(async (req, res) => {
    try {
      if (req.method == "GET") {
        if (req.url === "/") {
          //http://localhost:3000

          const data = await fs.readFile("./04_index.html");
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          // 본문 내용은 res.write 또는 res.end 로 전송하지만
          // res.end 는 전송 종료의 의미도 있음.
          return res.end(data);
        } else if (req.url === "/about") {
          const data = await fs.readFile("./04_about.html");
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          return res.end(data);
        } else if (req.url === "/user") {
          res.writeHead(200, {
            "Content-Type": "application/json; charset=utf-8",
          });
          // users 객체 안의 내용을 json 형식으로 변경하여 전송
          return res.end(JSON.stringify(users));
        }
      } else if (req.method == "POST") {
        if (req.url === "/user") {
          req.on("data", (data) => {
            //console.log(data);
            let body = data.toString();
            //console.log(body);
            const { username } = JSON.parse(body); // 구조분해
            //console.log(username);
            const id = Date.now(); // 현재시간 날짜를 밀리초로 표시
            users[id] = username;
            console.log(users);
            return res.end("ok");
          });
        }
      } else if (req.method == "PUT") {
        if (req.url === "/user") {
          req.on("data", (data) => {
            let body = data.toString();
            const { key, username } = JSON.parse(body);
            users[key] = username;
          });
          return res.end("ok");
        }
      } else if (req.method == "DELETE") {
        if (req.url.startsWith("/user")) {
          // url : '/user/12893548'
          // [0], user : [1], 12893548 : [2]
          let urlarr = req.url.split("/"); // 대상 String 데이터를 지정한 글자로 분리하여 배열에 저장
          // '123-234-345-356'.split('-') => 123 234 345 356 으로 하나의 배열에 한칸씩 저장됨
          const key = urlarr[2];
          delete users[key];
          return res.end("ok");
        }
      }
    } catch (err) {
      console.error(err);
    }
  })
  .listen(3000, () => {
    console.log("Server opened at 3000 port");
  });
