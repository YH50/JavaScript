//10_Ex02.js

// 주어진 배열 자료를 반복실행으로 학생 단위 객체로 저장하고 다시 객체 배열로 구성하여
// for 문을 사용해서 학생별로 출력하기

const names = ["까리나", "윈타", "즈젤", "닌닌"];
const kor = [100, 90, 70, 50];
const mth = [90, 60, 80, 60];
const eng = [100, 100, 100, 100];

const students = [];
// 위 배열에 생성자로 생성된 학생 객체를 요소로 추가할 것. >> 반복문 이용
function student(name, korean, math, english) {
  this.name = name;
  this.kor = korean;
  this.mth = math;
  this.eng = english;
}

// 배열에 요소를 추가하는 명령 : students.push(std);

// 학생 배열 생성 >> 각 학생 배열에 이름, 과목 차례로 추가

// let std1 = student(names[0], kor[0], mth[0], eng[0]);
// let std2 = student(names[1], kor[1], mth[1], eng[1]);
// let std3 = student(names[2], kor[2], mth[2], eng[2]);
// let std4 = student(names[3], kor[3], mth[3], eng[3]);

// "길다. 반복실행해라."

for (let i = 0; i < names.length; ++i) {
  const std = new student(names[i], kor[i], mth[i], eng[i]);
  students.push(std);
}

for (std of students) {
  console.log(std);
}
