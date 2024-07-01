// 15_Promise04.js

// promise 를 이용한 비동기실행에서 두 작업의 실행순서를 맞춰야 할 때

let pm = new Promise((resolve, reject) => {
  console.log("==work start==");
  resolve();
});
pm.then(() => {
  console.log("work1 start");
  const wakeUpTime = Date.now() + 3000;
  while (Date.now() < wakeUpTime) {}
  console.log("work1 End");
  // 첫번째 then 에서 작업2를 위한 새로운 Promise 를 리턴함
  return new Promise((resolve, reject) => {
    resolve();
  });
  // >> Chaining 방식 : 새로운 then 을 이어서 사용할 수 있게 해줌
})
  .then(() => {
    console.log("work2 Start");
    console.log("work2 End");
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    console.log("== All Task Terminated ==");
  });
