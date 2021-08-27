Promise.resolve().then(() => {
  console.log(0);
  setTimeout(() => {
    console.log('宏任务');
  }, 0);
  return Promise.resolve(4)
  // return 4
}).then((res) => {
  console.log(res)
})

Promise.resolve().then(() => {
  console.log(1)
}).then(() => {
  console.log(2)
}).then(() => {
  console.log(3)
}).then(() => {
  console.log(5)
}).then(() => {
  console.log(6)
}).then(() => {
  console.log(7)
}).then(() => {
  console.log(8)
})

// 1. 运用手写MyPromise 输出顺序表现不一致 怀疑代码问题
// 2. 参考网上各种手写实现， 表现也不一致， 怀疑原生promise有替代不了的
// 3. return Promise.resolve(4) 会产生两个微任务
// 4. 当前执行栈为空时， 才会resolve掉这个新的promise
