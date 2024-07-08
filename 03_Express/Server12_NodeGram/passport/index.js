// index.js

const passport = require("passport");
const mysql = require("mysql2/promise");
const kakao = require("./kakaostrategy");

async function getConnection() {
    let connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "adminuser",
      database: "nodegram",
    });
    return connection;
}

// 여기서도 kakao() 함수 호출 명령이 포함된 익명함수 하나가 export 되고, 이는 App.js 에서 사용할 예정
module.exports = ()=>{
    // 이곳의 함수의 역할 : 로그인이 정상 완료된 후 req.login() 이 자동으로 호출되면 추가로 같이 실행되는 함수들
    passport.serializeUser((user, done)=>{
        done(null, user.email);
        // 세션에 이메일만 저장하고
        // 쿠키에 있는 sid 값을 key로 하여 세션값을 관리함
        // 쿠키에서 확인할 수 있는 값 확인 요망
    });
    // 이메일로 사용자 정보를 축소

    passport.deserializeUser(async (email, done)=>{
        const connection = await getConnection();
        try{
            let [rows, fields] = await connection.query('select * from user where email=?', [email]);
            done(null, rows[0]);    // 세션에 저장된 이메일과 쿠키로 user 를 복구 & req.user 로 로그인된 사용자 정보를 관리 (req.user <- rows[0])
        }catch(err){done(err);}
    });
    // 이메일로 검색하여 사용자 전체 정보를 복원
    kakao();        // require 된 함수를 호출
}