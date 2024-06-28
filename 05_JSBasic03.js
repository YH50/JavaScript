// 05_JSBasic.js

// 자바스크립트 변수의 특별한 기능
// 자바스크립트의 변수 : 함수도 저장이 가능함
var fv = function () {
  console.log("함수를 변수에 저장함. 그리고 변수 이름으로 호출함");
};
// function(){} >> 익명함수
// 익명함수를 변수에 저장하여 변수명을 함수명인 것처럼 사용하여 호출
fv();
console.log("------------------------------------------");

// 강제 자료형 변환
// - 다른 자료형 >> 숫자 변환 = Number() 함수 사용
// - 다른 자료형 >> 문자열 변환 = String() 함수 사용
console.log("문자 > 숫자 : ", Number("88857") + 123); //산술 덧셈
console.log("숫자 > 문자 : ", String(12.324) + 541); // 이어붙이기 연산

// Boolean() : 기타 다른 자료형을 true/false 로 변환
console.log("Boolean(0) : ", Boolean(0)); // >> false
console.log("Boolean('0') : ", Boolean("0")); // true
console.log("Boolean('') : ", Boolean("")); // false
console.log("Boolean('false') : ", Boolean("false")); // true
console.log("Boolean(null) : ", Boolean(null)); // false
console.log("Boolean(undefined) : ", Boolean(undefined)); //false
console.log("------------------------------------------");

// Template String
const no1 = 1;
const no2 = 2;
const result = 3;
const str1 = no1 + "더하기" + no2 + "는" + result + "입니다";
console.log("+ 기호로 이어붙인 결과 : ", str1);

// Template String 을 사용하는 연산
// jsp 페이지에서 EL 문법을 사용한 것과 유사하게 문자열 & 변수값을 하나의 문장 안에 같이 표현하는 문법
// 전체 문자열 : `(그레이브-틸드기호 아레에 있는 따옴표와 비슷한 기호 = 역따옴표)로 묶고
// 그 안에 apostrophe(작은따옴표)와 큰따옴표를 자유롭게 사용하며, ${변수명}을 이용하여 변수값을 문자열 안에 삽입함

let str2 = `${no1} 더하기 ${no2} 는 ${result}`;
console.log("Template String 구성 결과 : ", str2);

// 기존 EL 문법처럼 중괄호 안에서는 각 변수들 간의 연산도 가능함
const no5 = 200;
const no6 = 3;
const text = `${no5} 원짜리 사탕을 ${no6}개 사서 ${no5 * no6}원을 지출함.`;
console.log("연산결과 : ", text);
