// Regex_02.js

// 메타캐릭터(메타 문자) : ^, $, | 등의 글자로 패턴을 표현한 글자들
// | : 'or' 의 의미로 사용. (a|b >> a 또는 b)

let text = "Busan Lotte";
let result = text.match(/Busan|Giants/g);
console.log(result);

text = "Seoul LGTwins";
result = text.match(/Busan|Seoul/g);
console.log(result);

text = "Busan Lotte Seoul LGTwins";
result = text.match(/Busan|Seoul/g);
console.log(result);

console.log("==============================================");

// ^ : ^abc >> abc 로 시작하는 의미의 정규식([] 안에서 사용할 때는 다른 의미)
a = "Welcome To The Show";
result = a.match(/^Welcome/g);
console.log(result);

// $: abc$ >> abc 로 끝나는 의미의 정규식
a = "Welcome To The Show";
result = a.match(/Show$/g);
console.log(result);

console.log("==============================================");
// *\b : Word Boundary 라는 뜻  >> whitespace(공백) 로 식별되는 메타 문자
// * 원래 문자열 안에 사용하는 \b 는 백스페이스의 역할을 하는 이스케이프 문자이지만
// * 정규표현식에서는 공백을 의미하도록 사용됨
console.log();
a = "no class are all classa";
b = a.match(/\bclass\b/g);

a = "the declassified algorithm";
b = a.match(/\bclass\b/g);
console.log(b);

a = "one subclass is";
b = a.match(/\bclass\b/g);
console.log(b);
// \B : whitespace(공백)가 아닌 글자들과 매칭, 공백 외 다른 글자로 구분되는 정규식  (대문자다!!!)
console.log();
a = "no class are all classa";
b = a.match(/\Bclass\B/g);

a = "the declassified algorithm";
b = a.match(/\Bclass\B/g);
console.log(b);

a = "one subclass is";
b = a.match(/\Bclass\B/g);
console.log(b);

console.log("==============================================");
// 정방 탐색
// http://www.naver.com 에서
// 글자들이 연속되고 ':' 뒤에 붙어있는 정규표현 매칭
// BUT 결과에서 ':' 는 빼고 나머지 글자들만 얻고 싶을때 = http 만 필요할 때

text = "http://www.naver.com";
result = text.match(/.+:/g); // 글자가 연속되고 뒤에 : 가 있는 매칭
console.log(result); // 결과값 = http:

console.log();
// 위와 같은 매칭도 하고 ':' 도 버리고 http 만 취하려면
// 정방 탐색을 사용한 예시)
// 정규식 : (?=정규식 or 글자)
// 조건에 매칭이 된 후 해당(?= 뒤로 이어진) 정규식에 있는 글자는 소모하지 않음(취하지 않음)

// ':' 이 매칭에 쓰이지만 결과에 포함시키진 않음
result = text.match(/.+(?=:)/g); // 후방위 탐색
console.log(result);

// 전방위 탐색
// >> 매칭할 글자를 앞쪽에서 검색하고 취하지 않을 때
// ?<=정규식
text = "★개꼴데해체해";
result = text.match(/(?<=★).+/g); // 후방위 탐색 : ★로 시작되는 매칭 >> 별표는 결과에 포함되지 않음
console.log(result);

// 후방위 탐색
// 매칭할 글자를 뒷쪽에서 검색하고 취하지 않을 때
// ?=정규식

text =
  "<html><head><title>감사합니다 반갑습니다 사랑합니다</title></head><body><div>오늘 롯데가 승리한다</div></body></html>";
// <div></div> 가 포함된 채 추출됨
result = text.match(/<div>.+<\/div>/g);
console.log(result);

result = text.match(/(?<=<div>).+(?=<\/div>)/g);
console.log(result);

// 예제 1 : 위 텍스트 변수 내용 중 title 내용만 발췌해서 출력하기, title 태그는 제외할것
result = text.match(/(?<=<title>).+(?=<\/title>)/g);
console.log(result);

// 예제 2 : 아래 텍스트 변수에서 파일이름.확장자명 으로 구성된 파일명 & 확장자 출력하기
// 확장자가 없는 파일은 제외할 것
text =
  "일반 텍스트 파일 : asd.txt, 자동실행파일 : autoexec.bat, 데이터분석파일 : bigdata.ai, 더미파일 : qwerq, 알수없는 파일 : lotte.bar";
result = text.match(/\w+[.]\w+/g);
console.log(result);
result = text.match(/\w+(?=[.]\w+)/g); // 파일명만 발췌 >> 후방위 탐색
console.log(result);

// 연습문제 3
text =
  "같은 취미를 가진 사람들과 소통합니다.   #취미 #포스팅 취미를 활용하여 포스팅합니다  #소통 #SNS   #mood";
// 위 텍스트에서 해시태그들만 골라서 출력하기

result = text.match(/#[^\s#]+/g);
console.log(result);

result = text.match(/(?<=#)[^\s#]+/g);
console.log(result);
