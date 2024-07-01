// 12_Promise01.js

// 함수와 비슷한 기능을 하는 "객체"
// 객체 내에 익명 함수 하나를 품고 있음
// 익명함수를 실행하고 결과를 보관하고 있다가 결과가 필요할 때 실행 결과를 전달받아 사용하게 해주는 구조
// 비동기식 실행

// promise 객체의 전달인수 없는 선언문.
// >> const pm = new Promise(/* 익명함수 */)
// promise 객체는 생성자의 전달인수로 현재 promise 객체의 기능을 갖는 익명함수를 전달해야만 생성됨

// promise 객체 생성 Ex)
const pm = new Promise((resolve, reject) => {});

let func = (resolve, reject) => {};
const pm1 = new Promise(func);

// 매개변수 resolve & reject : 함수가 전달되어 resolve(), reject() 형식으로 함수가 호출되는 명령이 작성됨
const pm2 = new Promise((resolve, reject) => {
  resolve();
  // or reject();
});
// resolve & reject 변수에 전달되는 함수 : promise 객체가 자체적으로 전달해줌

//--------------------------------------------------------------------------------

// 익명함수 안에서 promise 에 부여된 임무를 위한 코드들이 실행되면서 같이 resolve(), reject()가 선택실행됨
// 보통 익명함수가 받은 목적의 내용들이 실행된 후 결과에 따라 resolve() or reject() 하나를 선택실행함

// const pm4 = new Promise((resolve, reject) => {
//   if (/*조건*/ true /*or false */) {
//     resolve("성공");
//   } else {
//     reject("실패");
//   }
// });

// 위에 넣은 전달인수는 반드시 String 데이터여야만 하는 것은 아님 >> 아무 데이터 유형 다 가능
// 주로 promise 결과를 사용할 곳에서 유용하게 사용할 데이터를 전달함
// String, Number, 배열, 객체 등 모두 전달이 가능함.

// promise 객체의 실행결과 활용(결과를 품고 있는 객체를 필요에 의해 필요한 때에 별도 활용 가능함)
// pm4.then();
// pm4.catch();
// pm4.then().catch();

//pm3.then(() => {}).catch(() => {});

// resolve() 가 호출된 경우 then 안의 익명함수 실행, reject() 호출 또는 pm 오류 발생 시 catch 안의 익명함수 실행
// pm4
//   .then((message) => {
//     console.log(message);
//   })
//   .catch((message) => {
//     console.log(message);
//   });

let condition = true; // 특정 상황을 만들기 위한 상태값

const pm5 = new Promise((resolve, reject) => {
  if (condition) {
    resolve("condition 값 true");
  } else {
    reject("condition 값 false");
  }
});
pm5
  .then((msg) => {
    console.log(msg);
  })
  .catch((msg) => {
    console.log(msg);
  })
  .finally(() => {
    console.log("Promise  종료");
  });
console.log("에베베베베");
console.log("에베베베베");
console.log("에베베베베");
console.log("에베베베베");
console.log("프로그램 종료");
