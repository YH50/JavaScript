// 13_Promise02.js

// Promise 의 다른 실행 형태

let condition = true;

function callPromise() {
  const pm = new Promise((resolve, reject) => {
    // 이곳에 파일 입출력 명령 or 네트워크 송수신 명령 기술함
    if (condition) {
      console.log("1 : resolve");
      resolve("값1");
    } else {
      console.log("2 : reject");
      reject();
    }
  });
  return pm;
}

// callPromise();
// pm.then().catch().finally();

callPromise()
  .then(() => {
    console.log("3.성공");
  })
  .catch(() => {
    console.log("4.실패");
  })
  .finally(() => {
    console.log("5. promise end");
  });
console.log("6. end");

async function func() {
  try {
    let result = await callPromise();
    console.log("비동기 실행 결과 : ", result);
  } catch (err) {
    console.error(err); // console.log 이랑 별 차이는 없는데 주로 에러 출력 시 사용함
  }
}
func();
