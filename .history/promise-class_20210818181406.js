const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MPromise {
  FULFILLED_CALLBACK_LIST = [];
  REJECTED_CALLBACK_LIST = [];
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
      switch (this.status) {
        case FULFILLED: {
          realOnFulfilled();
          break;
        }
        case REJECTED: {
          realOnRejected();
          break;
        }
        case PENDING: {
          this.FULFILLED_CALLBACK_LIST.push(realOnFulfilled);
          this.REJECTED_CALLBACK_LIST.push(realOnRejected);
          break;
        }
      }
    })

    return promise2;
  }

  isFunction(value) {
    return typeof value === 'function';
  }
}

const promise = new MPromise((resolve, reject) => {

});