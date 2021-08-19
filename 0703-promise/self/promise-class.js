const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MPromise {
  FULFILLED_CALLBACK_LIST = [];
  REJECTED_CALLBACK_LIST = [];
  _status = PENDING;

  /**
   * 
   * @param { Function } fn (resolve, reject) =>
   */
  constructor(fn) {
    // 初始状态为pending
    this.status = PENDING;
    this.value = null;
    this.reason = null;

    try {
      fn(this.resolve.bind(this), this.reject.bind(this));
    } catch (e) {
      this.reject(e);
    }
  }

  get status() {
    return this._status;
  }

  set status(newStatus) {
    this._status = newStatus;
    switch (newStatus) {
      case FULFILLED: {
        this.FULFILLED_CALLBACK_LIST.forEach(callback => {
          callback(this.value);
        })
        break;
      }
      case REJECTED: {
        this.REJECTED_CALLBACK_LIST.forEach(callback => {
          callback(this.reason);
        })
        break;
      } 
    
      default:
        break;
    }
  }

  resolve(value) {
    // 判断状态， 只有PENFDING状态才可以变成FULFILLED
    // 更新value
    if (this.status === PENDING) {
      this.value = value;
      this.status = FULFILLED;
    }
  }

  reject(reason) {
    // 判断状态， 只有PENFDING状态才可以变成REJECTED
    // 更新reason
    if (this.status === PENDING) {
      this.reason = reason;
      this.status = REJECTED;
    }
  }

  then(onFulfilled, onRejected) {
    // 6.3 如果 onFulfilled 不是一个函数， promise2 以 promise1 的 vaule 触发 fulfilled
    const realOnFulfilled = this.isFunction(onFulfilled) ? onFulfilled : (value) => {
      return value;
    }

    // 6.4 如果 onRejected 不是一个函数， promise2 以 promise1 的 reason 出发 rejected
    const realOnRejected = this.isFunction(onRejected) ? onRejected : (reason) => {
      throw reason;
    }

    // then 的返回值整体是一个promise
    const promise2 = new MPromise((resolve, reject) => {
      // 6.2 onFulfilled 或者 onRejected 执行时抛出异常， promise2 需要被 reject
      const fulfilledMicrotask = () => {
        queueMicrotask(() => {
          try {
            // 6.1 onFulfilled 或者 onRejected 执行的结果为x， 调用 resolvePromise
            const x = realOnFulfilled(this.value);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        })
      }

      const rejectedMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = realOnRejected(this.reason);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        })
      }

      switch (this.status) {
        case FULFILLED: {
          fulfilledMicrotask();
          break;
        }
        case REJECTED: {
          rejectedMicrotask();
          break;
        }
        case PENDING: {
          this.FULFILLED_CALLBACK_LIST.push(fulfilledMicrotask);
          this.REJECTED_CALLBACK_LIST.push(rejectedMicrotask);
          break;
        }
      }
    })

    return promise2;
  }

  resolvePromise(promise2, x, resolve, reject) {
    // 7.1 如果 promise2  和 x 相等， 那么 reject TypeError
    if (promise2 === x) {
      return reject(new TypeError('The promise and the return value are the same'));
    }

    if (x instanceof MPromise) {
      // 如果x是promise， 那么让新的promise接手x的状态
      // 即继续执行x， 如果执行的时候又拿到了一个y， 那么继续解析y
      queueMicrotask(() => {
        x.then((y) => {
          this.resolvePromise(promise2, y, resolve, reject);
        })
      });
    } else if (typeof x === 'object' || this.isFunction(x)) {
      if (x === null) {
        return resolve(x);
      }

      let then = null;

      try {
        // 去x.then赋值给then
        then = x.then;
      } catch (e) {
        return reject(e);
      }

      if (this.isFunction(then)) {
        let called = false;
        try {
          then.call(
            x,
            (y) => {
              if (called) {
                return;
              }
              called = true;
              this.resolvePromise(promise2, y, resolve, reject);
            },
            (r) => {
              if (called) {
                return;
              }
              called = true;
              reject(r);
            }
          )
        } catch (error) {
          if (called) {
            return;
          }
          reject(error);
        }

      } else {
        resolve(x);
      }
    } else {
      resolve(x);
    }
  }

  isFunction(value) {
    return typeof value === 'function';
  }
}

const test = new MPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(111);
  }, 1000);
}).then((value) => {
  console.log(value);
})