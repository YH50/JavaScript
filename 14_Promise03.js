// 14_Promise03.js

// 동기 실행 vs 비동기실행 비교

// 동기 실행

/*
console.log("== 작업 시작 == ");
console.log("작업 1 시작");
// 현재 시간을 얻어서 3초를 더한 시간을 계산
const wakeUpTime = Date.now() + 3000;
// 반복 실행 동안 연속하여 현재 시간을 얻으면서 아무것도 안하는 반복 실행을 진행함
// Until 3초 후 시간
while (Date.now() < wakeUpTime) {} // 작업 1에 3초 간 긴 작업시간 포함
console.log("작업1 종료");
console.log("작업2 시작");
console.log("작업2 종료");
console.log("=== 모든 작업 종료 ===");
*/

// 비동기 실행

/* SetTimeout 을 이용
function longRunningTask() {
  console.log("작업1 시작");
  const wakeUpTime = Date.now() + 3000;
  while (Date.now() < wakeUpTime) {}
  console.log("작업1 종료");
}
console.log("작업 시작");
console.log("작업1을 비동기 실행으로 전환");
setTimeout(longRunningTask, 0); // 지정한 시간 후 지정된 함수가 호출실행됨 >> 비동기실행
console.log("작업2 시작");
console.log("작업2 종료");
console.log("=== 작업 종료 ===");
*/

// Promise로 비동기실행
let pm = new Promise((resolve, reject) => {
  console.log(" == 작업 시작 ==");
  resolve(); // 비동기 실행할 내용의 호출
  console.log("작업 2 시작");
  console.log("작업 2 종료");
  console.log("== 모든 작업 종료 ==");
});
pm.then(() => {
  console.log("작업 1 시작");
  const wakeUpTime = Date.now() + 3000;
  while (Date.now() < wakeUpTime) {}
  console.log("작업1 종료");
});
