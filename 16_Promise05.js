// 16_Promise05.js

let condition = true;

const job2 = new Promise((resolve, reject) => {
  if (condition) {
    console.log("work2 start");
    resolve("work2 end");
  } else reject("reject initiated");
});

async function ac() {
  try {
    console.log("work1 start");
    console.log("work1 end");
    let result = await job2; // 괄호 빼라!!!
    console.log(result);
    console.log("work3 start");
    console.log("work3 end");
  } catch (error) {
    console.error(error);
  }
}
ac();
