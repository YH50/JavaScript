const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("port", process.env.PORT || 3000);

// static folder 설정
app.use("/", express.static(path.join(__dirname, "uploads")));

// 업로드 폴더 생성 - fs 모듈 이용
// 업로드용 폴더로 사용할 폴더를 조사해보고 없으면 생성, 있으면 그 폴더를 이용함
try {
  fs.readdirSync("uploads");
} catch (err) {
  console.error("uploads 폴더를 찾을 수 없어 폴더를 생성합니다");
  fs.mkdirSync("uploads");
}
//=====================//

const uploadObj = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      // 업로드된 파일이 저장될 폴더 설정
      done(null, "uploads/");
    },
    filename(req, file, done) {
      // 업로드된 파일이 저장되기 전 파일이름을 변경하는 설정
      const ext = path.extname(file.originalname);
      const fn = path.basename(file.originalname, ext) + Date.now() + ext;
      done(null, fn); // 변경된 이름으로 파일을 저장하는 설정
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
//=====================//
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "fileupload.html"));
});
app.post("/upload", uploadObj.single("image"), (req, res) => {
  res.json({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    filename: req.file.filename,
  });
});

// ===================서버 오픈 Terminal 창=======================================
app.listen(app.get("port"), () => {
  console.log(app.get("port"), "Server opened");
});
