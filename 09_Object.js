//09_Object.js

// 하나의 변수 안에 여러 속성(멤버변수) & 멤버 메소드들을 생성한 후 객체 지향 프로그래밍이 가능함
// 중괄호{} 안에 key(요소의 이름) & value(요소의 값)가 ':' 으로 구분되어 존재하는 값들의 집합
var objectVar = { a: 10, b: 20 };
var product = { name: "아이퐁", 제조사: "애쁠" };
var obj = {};

// 배열의 자료형
console.log("objectVar : ", typeof objectVar);
console.log("product : ", typeof product);
console.log("obj : ", typeof obj);

console.log("{a:10, b:20} : ", typeof { a: 10, b: 20 });
console.log(
  "{ name: '아이퐁', 제조사: '애쁠' } : ",
  typeof { name: "아이퐁", 제조사: "애쁠" }
);
console.log("{} : ", typeof {});

// 객체의 값
console.log("objectVar.a : ", objectVar.a, " objectVar.b : ", objectVar.b);
console.log("product.name : ", product.name, " product.b : ", product.제조사);
console.log(
  "objectVar.a : ",
  objectVar["a"],
  " objectVar.b : ",
  objectVar["b"]
);
console.log(
  "product[name] : ",
  product["name"],
  " product[제조사] : ",
  product["제조사"]
);
console.log("\n----------------------------------------\n");

// 자바스크립트의 객체 : 별도 클래스 선언 없이 {} 안에 직접 속성(키:값)들을 넣는 순간
// Object(객체)로 인식되어 사용됨. 값들의 자료형 : 제한 없음, "객체 내 객체", "객체 내 배열" 등
// 모든 형태의 자료가 속성들로 구성이 가능함

var obj1 = {
  useNo: 162,
  useString: "뉴진스",
  useBoolean: true,
  useObject: { a: 1, b: 2 },
  useArray: [1, 2, 3, 4, 5],
};
for (var k in obj1) {
  console.log(`${k} : ${obj1[k]}`);
}
console.log("\n----------------------------------------\n");

// 객체의 속성 추가 & 제거
// - 동적 속성 추가 & 제거 : 처음 객체를 생성하는 시점 이후 객체의 속성을 추가하거나 제거가 가능함
// 빈 객체를 생성
var student = {};
// 속성(멤버변수) 추가
student.이름 = "강해린";
student.취미 = "롯데야구 시청";
student.특기 = "미인계";
student["장래희망"] = "세계 1등";
for (var key in student) {
  console.log(`${key}:${student[key]}`);
}
console.log("\n----------------------------------------\n");

// 객체의 속성 제거
delete student.장래희망;
for (var key in student) {
  console.log(`${key}:${student[key]}`);
}
console.log("\n----------------------------------------\n");

// 객체의 멤버 메소드
// - 객체 내부에 있는 멤버변수(속성)를 컨트롤하거나 객체 관련 명령을 실행하기 위한 함수
var obj3 = {
  useNo: 162,
  useString: "뉴진스",
  useBoolean: true,
  useObject: { a: 1, b: 2 },
  useArray: [145, 252, 345, 454, 576],
  method: function () {
    console.log("멤버함수(익명함수) 실행");
  },
  func: () => {
    console.log("멤버 함수(화살표함수) 실행");
  },
};
obj3.method();
obj3.func();

console.log("\n----------------------------------------\n");

// 멤버함수에 매개변수가 존재하는 경우도 있음
var person = {
  name: "강강강",
  eat: function (food) {
    console.log(`음식:${food}`);
  },
};
person.eat("돈까쓰");

// 멤버 함수가 멤버 변수로의 접근
// >> 자바스크립트가 멤버변수에 접근하기 위해서는 "반드시" 'this' 키워드를 써줘야 접근이 됨!!
var person = {
  name: "강강강",
  eat: function (food) {
    console.log(`${this.name}이 ${food}를 먹었어요`); // 그냥 name 써버리면 못찾고 오류남
  },
};
person.eat("마라탕후루");

console.log("\n----------------------------------------\n");

// 생성자 함수
// new 키워드를 사용하여 동일한 객체를 여러개 생성할 수 있는 함수

// 생성자 함수 제작 방법
// 1. 함수 하나를 생성하되 함수 안에 this를 이용한 변수에다 값을 넣음
// 2. 이때 그 이름의 멤버 변수가 만들어지고
// 3. 최종 그 변수들을 멤버로 하는 객체가 만들어지는 생성자 함수로 인식됨
function Student(name, korean, deutsch, english, spanish) {
  this.name = name;
  this.korean = korean;
  this.deutsch = deutsch;
  this.english = english;
  this.spanish = spanish;
}
var std1 = new Student("김민지", 100, 90, 100, 80);
var std2 = new Student("박민지", 64, 86, 65, 35);
var std3 = new Student("권민지", 56, 32, 46, 65);

console.log(std1);
console.log(std2);
console.log(std3);

// 멤버변수를 추가해주고 싶을때 >> ex. music 과목을 추가하고 싶을때

std1.music = 100; // 이렇게 되면 std1 한테만 추가됨

// 7. 프로토타입
// - 생성자 함수를 사용하여 생성된 객체가 공통으로 가지는 공간
// - 자바스크립트의 모든 생성자 함수는 내부의 this 변수들의 prototype을 가짐.
// - 생성자 함수에 멤버 변수나 멤버 메소드를 추가하고 생성자를 이용하여 객체가 만들어질때 적용되게 하려면
// - 프로토타입을 이용한다 이말이야

// >>> 생성자 함수에 추가로 멤버변수 or 멤버 메소드를 추가
Student.prototype.music = 100;
var std4 = new Student("바네사", 94, 95, 87, 90);
console.log(`std4.music : ${std4.music}`);
console.log(std4);
