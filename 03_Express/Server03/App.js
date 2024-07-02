const express = require("express");
const path = require("path");
const app = express();
app.set("port", process.env.PORT || 3000); //process.env.PORT : 시스템 포트 번호
// 라우터 : app.get() 또는 app.post() 등등
// 미들웨어 : 라우터 안에 있는 익명함수
// req 가 요청을 받아 미들웨어를 실행하고 그 안에서 res 로 응답

// 1. req 가 요청받은 url 없이 미들웨어만 실행하기 위한 라우터가 존재함
// 모든 라우터들이 실행되기 전 공통코드가 실행되는 라우터 : app.use();
// 보통 다른 라우터들의 위 쪽에 작성
// 모든 라우터들이 실행되기 전 실행의 대상으로 인식됨
// 서버에서 각 url 별로 해야할 일들 외에 공통으로 작업해야 하는 일이 있다면 여기에 작성함

app.use((req, res, next) => {
  console.log("모든 요청에 실행됩니다");
  // 공통 실행 라우터를 포핳ㅁ한 모든 라우터는 해당 미들웨어 실행 후 종료됨
  // 다음 라우터로 이동하지 않는 것이 통상적.
  // 공통 실행 라우터는 자신도 실행되고 해당 url의 라우터도 실행되게 하기 위해서
  // 매개변수에 next 를 넣고 익명함수 끝에 next() 함수를 호출하여 다음 코드들이 실행되게 이어줌
  next();
  // 모든 라우터에 next가 있지만 사용하지 않아서 생략된 상태.
  // url 을 포함한 라우터를 다른 곳으로 이동할 필요가 없어서 사용하지 않을 뿐임
  // 필요 시 꺼내서 사용할 수 있음
  // next() 가 없으면 현재 미들웨어 라우터에서 요청에 대한 응답이 종료되고 더이상 이동하지 않음
  // 공통 코드 미들웨어를 위한 라우터는 반드시 next() 를 사용할 것.
});

// 2. 특정 url 에서만 실행할 공통코드 라우터 (이하 미들웨어라 부름)
app.use("/loginForm", (req, res, next) => {
  console.log("login 요청일 때만 실행됨");
  next();
});
// get 과 post 등 모든 method 에서 request 키워드만 같으면 실행됨
// 실행 후 next()로 인해 제어권이 아래로 이동하여 해당 get이나 post 등이 추가실행됨
//=======================================================================

// 3. 에러가 발생했을 때 사용하는 미들웨어도 존재
//      정상 라우터 or 공통 미들웨어 실행 중 에러가 발생했을 때
/*
app.use((req, res, next) => {
  // throw new Error("히히 에러 발싸ㅋㅋㅋ");       >> 콘솔창에도 나오고 브라우저에도 뜸
  try {
    throw new Error("히히 에러 발싸ㅋㅋㅋ");
  } catch (err) {
    //console.error(err);
    //next(); // 안 쓰면 페이지가 안넘어감
    next(err); // 서버에서 받은 에러 내용을 담고 next 로 이동.
    // next가 err 를 전달인수로 가지면 에러 처리 미들웨어로 이동하라는 뜻.
    // 에러 처리 라우터는 보통 현재 서버 프로그래밍의 가장 아랫쪽에 기술함.
  }
  // 브라우저에 에러 내용을 나오지 않게 하려면 1차적으로 try-catch 를 이용하고
  // 2번째로 에러 처리 라우터를 만들어서 사용함.
});
*/
//========================================================================

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/loginForm", (req, res) => {
  res.sendFile(path.join(__dirname, "/loginForm.html"));
});

// 5. 404 에러 처리
// 위의 모든 라우터를 검색하다가 해당 라우터가 없어서 현재 미들웨어를 만나게 되면 404 에러가 발생함
// 따라서 이 미들웨어는 맨 아래 or 에러처리 라우터 바로 위에 위치시킴
app.use((req, res, next) => {
  res.status(404).send("404 에러다 뽕아야ㅋㅋ"); // 400, 500 은 좀 위험함
});

// 4. 에러 처리 라우터
app.use((err, req, res, next) => {
  console.error(err);
  res.status(200).send("에러내용 안알랴줌 ㅋ");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "port server opened");
});
