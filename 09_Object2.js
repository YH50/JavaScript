//09_Object02.js

// 객체와 String 자료의 변수&함수 이름 활용
let sayNode = () => {
  console.log("Node");
};
let myName = "NodeJs";

let myObj = {
  // 이름이 myName 인 멤버변수를 만들고 그 값으로 'NodeJs' 라는 String 값을 저장하고 싶을때
  // 방법 1 >> myName:"NodeJs"
  // 방법 2 >> myName:myName    >> 값이 쓰일 위치에 동일한 값을 갖고 있는 변수 이름을 사용
  // 멤버 변수의 이름과 대입할 값을 갖고 있는 변수 이름이 같다면
  myName, // 이렇게 한번만 써도 방법2와 동일하게 수행됨

  //   sayNode: () => {
  //     console.log("Node");
  //   }
  // sayNode : sayNode,
  sayNode,
};
console.log("멤버변수 myName 값 : ", myObj.myName);
console.log("멤버변수 sayNode 값 : ", myObj.sayNode);
myObj.sayNode();
console.log("============================================================");
// obj3 객체와 ES6 멤버변수를 만들고 'Giants'라는 값을 저장하고 싶을때

const obj3 = {}; // 객체 생성
// obj3.ES6 = 'Giants';
// obj3['ES6'] = 'Giants';
let v = "ES";
obj3[v + "6"] = "Giants";
console.log("멤버변수 ES6 값 : ", obj3.ES6);

// 위에 내용들 모두 종합하여 객체 생성
const newObj = {
  myName,
  sayJS: () => {
    console.log("JS");
  },
  sayNode,
  [v + 6]: "Giants",
};
console.log(newObj.myName); //myName
newObj.sayNode(); //Node
newObj.sayJS(); //JS
console.log(newObj.ES6); //Giants
