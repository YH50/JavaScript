// 17_Console.js

const string = "abc";
const no = 1;
const boolean = true;
const obj = {
  outside: {
    inside: {
      key: "value",
    },
  },
};

console.log("일반적인 로그. 쉼표로 구분하여 여러 값을 찍을 수 있다");
console.log(string, no, boolean, obj);

// 출력할 내용이 평범한 텍스트일지라도 그것이 에러 메세지라면 console.error()에 담아 출력
console.error("에러 메시지는 console.error()에 담아주이소");

// console.table() 안의 객체 모양의 데이터들을 테이블 형태로 출력
console.table([
  { name: "twins", birth: 2023 },
  { name: "giants", birth: 2025 },
]);
// 같은 키들을 갖고 있는 다수의 객체를 행과 열로 정렬하여 출력
console.log();

// console.dir() : 객체 내의 또 다른 객체 등을 표현할 때 많이 사용함
console.dir(obj, { colors: true, depth: 2 });
console.dir(obj, { colors: true, depth: 1 });
// colors : 자료 표현 색의 지정 유무, depth : 표현하고자 하는 깊이
console.log();
