const express = require("express");
const path = require("path");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const app = express();
const session = require("express-session");
const passport = require('passport');

app.set("port", process.env.PORT || 3000);
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/img", express.static(path.join(__dirname, "uploads")));
dotenv.config();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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

const passportConfig = require ('./passport');    //passport 폴더의 index.js를 require 함
passportConfig();
app.use(passport.initialize());
app.use(passport.session());

const indexRouter = require("./Routers");
const userRouter = require("./Routers/user");
const feedRouter = require("./Routers/feed");

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/feed", feedRouter);

app.use((req, res, next) => {
  const err = new Error(`${req.method} - ${req.url} - 라우터가 없는데예!`);
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  let message = err.message;
  res.status(err.status);
  console.log(message);
  res.send("아 에러에요~");
});

// ===================서버 오픈 Terminal 창=======================================
app.listen(app.get("port"), () => {
  console.log(app.get("port"), "Server opened");
});
