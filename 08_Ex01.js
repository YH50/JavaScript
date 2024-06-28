// 08_Ex01.js
const date = new Date(); // 오늘 날짜 추출

// 오늘 날짜를 얻어서 요일을 출력하세요
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const mdays = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

let days = 0;
// 서기1년부터 year까지의 날짜 합산 (윤년 포함)
// days = 365 * (year-1);
// for( let i=1; i<year; i++){
//     if( (i%4 == 0)&&(i%100 != 0)||( i%400 == 0) ){
//         days++;
//     }
// }

const getYearsDays = (year) => {
  let days = 365 * (year - 1);
  for (let i = 1; i < year; ++i) {
    if ((i % 4 == 0 && i % 100 != 0) || i % 400 == 0) {
      days++;
    }
    return days;
  }
};
days = getYearsDays(year);

// 1월부터 month-1 까지의 날짜 합산(배열이용) - 해당날짜가 윤년이면 2월은 29일로
// if( (year%4 == 0)&&(year%100 != 0)||(year%400 == 0) ){
//     mdays[2] = 29;
// }
// for( let i=1; i<month; i++){
//     days += mdays[i];
// }

const getMonthsDays = (year, month) => {
  if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
    mdays[2] = 29;
  }
  for (let i = 1; i < month; i++) {
    days += mdays[i];
  }
  return days;
};
days = days + getMonthsDays(year, month);

// day 합산
days += day;

// 요일계산 및 출력
// const weekday = days % 7;
// if( weekday == 1 ){
//     console.log("월요일");
// }else if( weekday == 2 ){
//     console.log("화요일");
// }else if( weekday == 3 ){
//     console.log("수요일");
// }else if( weekday == 4 ){
//     console.log("목요일");
// }else if( weekday == 5 ){
//     console.log("금요일");
// }else if( weekday == 6 ){
//     console.log("토요일");
// }else if( weekday == 0 ){
//     console.log("일요일");
// }

const prnWeekday = (days) => {
  const weekday = days % 7;
  if (weekday == 1) {
    console.log("월요일");
  } else if (weekday == 2) {
    console.log("화요일");
  } else if (weekday == 3) {
    console.log("수요일");
  } else if (weekday == 4) {
    console.log("목요일");
  } else if (weekday == 5) {
    console.log("금요일");
  } else if (weekday == 6) {
    console.log("토요일");
  } else if (weekday == 0) {
    console.log("일요일");
  }
};
prnWeekday(days);
