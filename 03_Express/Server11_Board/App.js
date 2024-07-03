const express = require("express");
const path = require("path");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const session = require("express-session");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("port", process.env.PORT || 3000);
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/img", express.static(path.join(__dirname, "uploads")));
dotenv.config();

// Cookie & Session
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

const indexRouter = require("./Routers");
const membersRouter = require("./Routers/members");
const boardsRouter = require("./Routers/boards");

app.use("/", indexRouter);
app.use("/members", membersRouter);
app.use("/boards", boardsRouter);

// Error Router
app.use((req, res, next) => {
  // console.log(404);
  res.send("404 에러다 뿡뿡아");
});
app.use((err, req, res, next) => {
  console.error(err);
  // res.send('서버 에러임')
});

// ===================서버 오픈 Terminal 창=======================================
app.listen(app.get("port"), () => {
  console.log(app.get("port"), "Server opened");
});
