// kakaostrategy.js

const passport = require("passport");
const mysql = require("mysql2/promise");
// const { connect } = require("../Routers/feed");
const KakaoStrategy = require('passport-kakao').Strategy;

async function getConnection() {
    let connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "adminuser",
      database: "nodegram",
    });
    return connection;
}

// 카카오 로그인에 필요한 동작 : 익명함수에 기술함, 그 익명함수가 export 되어
// 이를 passport 폴더에 같이 있는 index.js 에서 require 하여 사용할 예정.

module.exports = ()=>{
    passport.use(
        new KakaoStrategy(
            {
                // 아래 정보로 사용자 인증 절차가 진행됨.
                clientID: process.env.KAKAO_ID,
                callbackURL: '/user/kakao/callback',
            },
            async(accessToken, refreshToken, profile, done)=>{
                // 사용자 인증이 완료되어 사용자 정보가 전달됨
                console.log(profile._json.properties.nickname, profile.id, profile._json.properties.nickname);
                try{
                    const connection = await getConnection();
                    // 토큰으로 받아온 사용자 정보를 조회하고 회원가입을 진행함
                    let sql = 'select * from user where email=?';
                    let [rows, fields] = await connection.query(sql, [profile._json.properties.nickname]);
                    // 이메일로 회원 유무 조회, 회원 가입 내역에 따라 가입절차 or done 함수 실행으로 다음 로그인 절차 진행
                    if(rows.length>=1){
                        // 바로 done 함수 실행
                        done(null, rows[0]);
                        // null : 로그인에 에러가 없음을 의미함
                    }else{
                        // 회원 가입 후
                        sql = 'insert into user(email, snsid, nickname, provider) values(?,?,?,?)';
                        [result, fields] = await connection.query(sql, [profile._json.properties.nickname, profile.id, profile._json.properties.nickname, 'kakao']);
                        // 방금 회원가입한 사용자를 조회
                        // 방금 추가한 레코드를 다시 검색 후 done 실행
                        console.log(11);
                        sql = 'select * from user where email=?';
                        [rows, fields] = await connection.query(sql, [profile._json.properties.nickname]);
                        console.log(22);
                        done(null, rows[0]);
                        console.log(33);
                    }
                }catch(err){
                    console.error(err);
                    done(err);
                }
            }
        )
    );
}