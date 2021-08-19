PromiseA+规范：

## 术语
1. promise 是一个有then方法的对象或者函数， 行为遵循promiseA+规范
2. thenable是一个有then方法的对象或者函数
3. value 是promise状态成功时的值， 就是resolve的参数， 包括各种数据类型
4. reason 是promise状态失败时的值， reject的参数， 表示拒绝的原因
5. exception throw 抛出去的异常

## 规范

### promise status

promise有三种状态， 注意他们之间的流转关系

resolve reject是动作
fulfilled rejected是状态， 是动作的结果

1. pending
  1.1 初始状态， 可改变
  1.2 一个promise被resolve或者reject之前， 处于这个状态
  1.3 通过resolve -> fulfilled
  1.3 通过reject -> rejected

2. fulfilled
  2.1 最终态， 不可改变
  2.2 一个promise经过resolve后变成这个状态
  2.3 必须拥有一个value值 // undefined

3. rejected
  3.1 最终态， 不可改变
  3.2 一个promise经过reject后变成这个状态
  3.3 必须拥有一个reason值 // undefined

### then

promise 应该提供一个then方法， 用来访问最终的结果， 无论是value还是reason

```js
promise.then(onFulfilled, onRejected);
```

1. 参数要求
  1.1 onFuifilled 必须是函数， 如果不是函数， 应该被忽略
  1.2 onRejected 必须是函数， 如果不是函数， 应该被忽略

2. onFulfilled特性
  2.1 在promise变成fulfilled时， 应该调用onFulfilled， 参数是value
  2.2 在promise变成fulfilled之前， 不应该被调用
  2.3 只能被调用一次

3. onRejected特性
  2.1 在promise变成rejected时， 应该调用onRejected， 参数是reason
  2.2 在promise变成rejected之前， 不应该被调用
  2.3 只能被调用一次

4. onFulfilled 和 onRejected 应该是微任务

  queueMicrotask实现微任务的调用

5. then方法可以被调用多次
  5.1 promise变成fulfilled后， 所有onFulfilled后， 所有的onFulfilled的回调都应该按照then的顺序执行
  在实现promise时， 需要数组来存储onFulfilled的cb
  
  5.2 promise变成rejected后， 所有onRejected后， 所有的onRejected的回调都应该按照then的顺序执行
  在实现promise时， 需要数组来存储onRejected的cb

6. 返回值
  then的返回值是一个promise

  ```js
  promise2 = promise1.then(onFulfilled, onRejected)
  ```
  6.1 onFulfilled 或者 onRejected 执行的结果为x， 调用 resolvePromise
  6.2 onFulfilled 或者 onRejected 执行时抛出异常， promise2 需要被 reject
  6.3 如果 onFulfilled 不是一个函数， promise2 以 promise1 的 vaule 触发 fulfilled
  6.4 如果 onRejected 不是一个函数， promise2 以 promise1 的 reason 出发 rejected

7. resolvePromise

  ```js
  resolvePromise(promise， 下， resolve， reject)
  ```

  7.1 如果 promise2  和 x 相等， 那么 reject TypeError
  7.2 如果 x 是 promise
      如果 x 是 pending， promise 的状态也必须是等待/ pending 直到 x 变成 fulfilled / rejected
      如果 x 是 fuifilled， fulfill promise with the same value
      如果 x 是 rejected， reject promise with the same reason
  7.3 如果 x 是一个 object 或者是一个 function 
      let then = x.then;
      如果 x.then 这一步出错了，  try catch(e), reject(e)
      如果 then 是一个函数， then.call(x, resolvePromiseFn, rejectPromiseFn) 

      resolvePromiseFn 的入参是y， 执行resolvePromise(promise2, y, resolve, reject)
      如果调用then的时候抛出了异常e， reject reason。

