// 11_ETC.js

// 배열의 복사
let arr1 = [1, 2, 3, 4];

// 참조값의 복사
let arr2 = arr1;
console.log(
  "참조값의 복사 : 변경 전 ---------------------------------------------------------"
);
console.log(arr1);
console.log(arr2);
arr1[0] = 50;
console.log(
  "참조값의 복사 : 변경 후 ---------------------------------------------------------"
);
console.log(arr1);
console.log(arr2);

// 배열 요소의 복사
let arr3 = [...arr1];
console.log(
  "배열요소의 복사 : 변경 전 ---------------------------------------------------------"
);
console.log(arr1);
console.log(arr3);
arr1[1] = 120;
console.log(
  "배열요소의 복사 : 변경 후 ---------------------------------------------------------"
);
console.log(arr1);
console.log(arr3);
console.log(
  "배열요소의 복사 - 복사와 동시에 요소 추가 ------------------------------------------"
);
arr4 = [...arr1, 5]; // 복사 & 요소 추가
console.log(arr4);
console.log(
  "두 배열의 병합---------------------------------------------------------"
);
arr5 = [...arr1, ...arr3];
console.log(arr5);

console.log("\n----------------------------------------------");

// 배열과 객체의 구조 분해

/*
// 배열의 구조 분해
let arr6 = [];
arr6.push("asap");
arr6.push(100);
arr6.push({ a: 154 });

let arr7 = [0, 14, 5, 6];
let zero, one, two, three, four, five;
// zero = arr7[0];
// one = arr7[1];
// two = arr7[2];
// three = arr7[3];

// [zero, one, two, three] = arr7;
// console.log(zero, one, two, three);

// 변수의 개수를 조절하여 분해할당을 하고 싶지 않은 값을 조절할 수 있음
// [zero, one, two] = arr7;

// 다수의 요소를 갖고 있는 배열에서 중간 일부를 제외한 요소를 취하고 싶을때
[zero, , , three] = arr7;
console.log(zero, three);

// 배열의 요소 개수보다 할당받을 변수의 개수가 더 많으면 남은 변수값은 undefined 로 표시됨
// (이건 해봤으니까 굳이 필기 안하겠음)

// 2차원, 3차원의 복잡한 배열의 구조분해
let arr8 = [0, 1, 2, [30, 40]];
// 형태를 맞춰서 구조분해 연산을 실행
[zero, one, two, [three, four]] = arr8;
console.log(zero, one, two, three, four);
*/

// 객체의 구조분해
let obj = { one: 1, nine: 9 };
let { one, nine } = obj;
console.log(one, nine);
// 필드명을 이용하여 객체의 구조 분해를 할 수 있으며, 이름이 맞지 않는 필드는 분해에서 제외시킬 수 있음
// 또한 필드로 존재하지 않는 변수는 undefined 로 저장됨
let { a1, a2 } = obj;
console.log(a1, a2);

// 이미 정의되어 있는 변수로 구조분해를 한다면 괄호로 묶어서 실행함
let three, four;
let obj1 = { three: 3, four: 4 };
// {three, four} = obj1   // Error : 이미 생성된 변수로 구조분해하는 경우
({ three, four } = obj1); // 객체를 별도의 변수에 저장하는 연산. '='이 쓰이는 것이 아닌
// 구조분해하는 것으로 인식하기 위해 () 를 사용.
console.log(three, four);

console.log("\n----------------------------------------------");
// 구조분해를 이용한 함수의 매개변수
function func4({ one, two, three }) {
  console.log(one, two, three);
}

let obj2 = { one: 1, two: 2, three: 3 };
func4(obj2);

func4({ one: 5, two: 7, three: 4 });
console.log("\n----------------------------------------------");

function func5(a) {
  console.log(a.one, a.plus.two, a.plus.five);
}
let obj3 = { one: 4, plus: { two: 2, five: 5 } };
func5(obj3);

console.log("\n----------------------------------------------");

// 구조 분해 및 매개변수의 기본값 (default value)

// 배열 구조분해 기본값
let [ar1, ar2, ar3 = 5] = [1, 2]; // 구조분해되는 변수에 기본값이 넣어서 전달값이 없어도 적용되게 함
// let [ar1, ar2, ar3 = 5] = [1, 2, 300];   // 이러면 ar3에 있던 기본값 5 대신 300이 들어감
console.log(ar1, ar2, ar3);
// 객체 구조분해 기본값
let { ob1, ob2 = 7 } = { ob1: 5 };
// let { ob1, ob2 = 7 } = { ob1: 5, ob2 = 500};   // 여기도 ob2 기본값 7 대신 500이 들어감
console.log(ob1, ob2);

console.log("\n----------------------------------------------");
let funcEX = (a = 10) => {
  return a * 5;
};
let result = funcEX();
console.log(`result:${result}`);

// 매개변수가 배열일 때의 기본값
let getTotal = ([one, two] = [10, 20]) => one + two;

console.log(`returned Value : ${getTotal()}`);
console.log(`returned Value : ${getTotal([30, 40])}`);

// 매개변수가 객체일 때의 기본값
let getValue = ({ two: value } = { two: 200 }) => value * 20;
console.log(`return Value : ${getValue({ two: 300 })}`); // 300 * 20
console.log(`return Value : ${getValue()}`); // default 값 200 * 20

console.log("\n----------------------------------------------");
// Destructuring : 객체의 필드명을 문자열의 연산으로 조합하여 생성
let item = {
  ["one" + "two"]: 15,
};
console.log(`item 객체의 멤버변수 onetwo의 값 : ${item.onetwo}`);

//item 변수에 앞서 저장한 객체를 지우고 "Baseball"이라는 String 데이터를 저장함
item = "Baseball";

let sports = {
  [item]: 1,
  [item + "Game"]: "다저스타디움",
  [item + "Method"]() {
    return this[item];
  },
};
console.log(
  `sports 객체의 멤버변수 값들 - bsbl:${sports.Baseball},
   bsblGame:${sports.BaseballGame}, bsblMethod:${sports.BaseballMethod()}`
);
console.log("\n----------------------------------------------");

// 내장된 객체 : Number 객체
// 표현가능한 양의 정수 Max 값 : 9007199254740991
console.log("1. 표현 가능한 양의 정수 Max 값 : ", Number.MAX_SAFE_INTEGER);
console.log("2. Math.pow(2, 53) - 1 : ", Math.pow(2, 53) - 1);
// Math.pow(a, b) : a의 b제곱

console.log("3. 표현 가능한 음의 정수 Max 값 : ", Number.MIN_SAFE_INTEGER); // -9007199254740991
console.log("4. -Math.pow(2, 53) - 1 : ", -(Math.pow(2, 53) - 1));

console.log("\n----------------------------------------------");
// Number 객체에서 사용할 함수 (메소드)
// 대상 데이터가 정수인지 아닌지를 판별
// Number.isInteger() 함수를 사용함
let v = 0;
console.log("1. 0 : ", Number.isInteger(v));
console.log("2. 1.0 : ", Number.isInteger(1.0));
console.log("3. -123 : ", Number.isInteger(-123));
console.log("4. '12' : ", Number.isInteger("12"));
console.log("5. 1.02 : ", Number.isInteger(1.02));
console.log("6. NaN : ", Number.isInteger(NaN));
console.log("7. true : ", Number.isInteger(true));
// 변수에 저장된 자료의 자료형을 알 수 있는 함수인 typeof 가 있지만 이는 자료형을 리턴만 해주고
// 필요에 의해 숫자인지 아닌지의 구분은 못함 >> 숫자가 반드시 필요한 경우의 구분을 Number.isInteger() 로 구분함

console.log("\n----------------------------------------------");
// String 데이터 & Number 데이터와의 관계
// 자바에서 'A' >> integer 형변환 시 (int)'A' -> 65, ()B -> 66, (char)67 -> 'C'   >>> ASCII 코드

console.log("1: ", String.fromCodePoint(35, 36, 37, 38)); // #$%&
console.log("2: ", String.fromCodePoint(65, 66, 67, 68)); //ABCD
console.log("3: ", String.fromCodePoint(97, 98, 99, 100)); //abcd
console.log("4: ", String.fromCodePoint(48, 49, 50, 51)); //0123
console.log("5: ", String.fromCodePoint(0x31, 0x32, 0x33)); //0123
console.log("6: ", String.fromCodePoint(44032, 44033, 44034, 44035)); // 가각갂갃(??)

console.log("\n----------------------------------------------");
// startsWith : 대상 문자들이 지정한 글자로 시작 시 true, 아니면 false
let target = "123가나다";
console.log("1 : ", target.startsWith(123)); // true
console.log("2 : ", target.startsWith("23")); // false
console.log("3 : ", target.startsWith("가나", 3)); // true (인덱스 3부터 "가나" 로 시작)
console.log();

console.log(target.endsWith("가나다")); // T
console.log(target.endsWith("가나")); // F
console.log(target.endsWith("가나", 5)); // T    >> 인덱스5(끝 글자) 가(4)나(5)로 끝남
console.log();

target = "123가나다456";
console.log(target.includes(2)); //T
console.log(target.includes("가나")); //T
console.log(target.includes("12", 5)); // F
console.log();
