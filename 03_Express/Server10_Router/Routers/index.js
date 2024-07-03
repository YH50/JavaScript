const express = require("express");
const router = express.Router();
// App.js 를 통해서 req가 전달되어지고 있으므로 app.get() 등을 쓸 일이 없음
// const app = express(); >> X
// App.js 와 연결되기 위해 라우터 기능은 이용함

// app.get(), app.post() 모두 안 씀

router.get("/", (req, res) => {
  res.send("<h1>Express Router    -index- '/'</h1> ");
});

router.get("/about", (req, res) => {
  res.send("<h1>Express Router    -index- '/about'</h1> ");
});

module.exports = router;
