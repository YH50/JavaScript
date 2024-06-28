// 06_Function.js

// 함수의 호출 형태를 나누는 기준(전달인수의 유무, 리턴값의 유무)
function abc() {}

function abb(x, y) {}

function acc(x, y) {
  return z;
}

// 전달인수로 함수가 전달되는 경우
// function add(x, y) {
//   return x + y;
// }
// function sub(x, y) {
//   return x - y;
// }
// function mul(x, y) {
//   return x * y;
// }
// function div(x, y) {
//   return x / y;
// }

const add = function (x, y) {
  return x + y;
};
const sub = function (x, y) {
  return x - y;
};
const mul = function (x, y) {
  return x * y;
};
const div = function (x, y) {
  return x / y;
};

function cal(a, b, func) {
  const res = func(a, b);
  return res;
}

let result = cal(15, 50, add);
console.log("리턴값 결과 : ", result);
result = cal(15, 50, sub); // 앞에 let 해놔서 뒤에는 안써도 됨 >> 덮어쓰는 방식
console.log("리턴값 결과 : ", result);
result = cal(15, 50, mul);
console.log("리턴값 결과 : ", result);
result = cal(15, 50, div);
console.log("리턴값 결과 : ", result);

// 리턴값이 익명함수인 경우
console.log("------------------------------------");

function cal2() {
  return function (x, y) {
    return x % y;
  };
}
const rem = cal2();
result = rem(69, 12);
console.log(`리턴 결과 : ${result}`);

// ArrowFunction

// 원래 함수 모습
function abc(x, y) {
  return x + y;
}

// 익명함수를 썼을때 모습
const abc1 = function (x, y) {
  return x + y;
};
// arrowFunction 썼을때 모습
const abc2 = (x, y) => {
  return x + y;
};

// arrowFunction 표현방법 #1
const abc3 = (x, y) => {
  return x + y;
};

console.log(`호출결과 : ${abc3(20, 32)}`);

// 만약 매개변수가 없는 함수라면 괄호만 표현해줌
const abc4 = () => {
  return 100;
};
// 만약 매개변수가 하나라면 아래처럼 괄호를 생략할때도 있음
const abc5 = (x) => {
  return 100;
};

// 함수의 표현 방법 #2
// 함수의 내용이 리턴만 있는 경우
// const add = (x, y) => { return x+y};
const add6 = (x, y) => x + y;
const add7 = (x, y) => x + y;

// 매개변수도 하나에 함수 몸체도 리턴밖에 없다면?
const sqr1 = (x) => x * x;
// 원래 모습
function sqr2(x) {
  return x * x;
}

// 매개변수 없고 리턴값도 없는 함수
const func1 = () => {
  console.log(`func1 = ()=>{} 매개변수 없고 리턴값도 없는 함수`);
};
func1();

// 매개변수 (전달인수)는 있는데 리턴값은 없는 함수
const func2 = (x, y) => {
  console.log(
    `func2 = (x,y)=>{} 매개변수-전달인수 (${x}, ${y}) 있고 리턴값 없는 함수`
  );
};
func2(30, 50);

// 매개변수와 리턴값 모두 있는 함수

const func3 = (x, y) => {
  console.log(
    `func3 = (x,y) =>{return ??;} 매개변수 (${x}, ${y}) 있고 리턴값도 있는 함수`
  );
  return x + y;
};
console.log.apply("리턴값 : " + func3(10, 30));
