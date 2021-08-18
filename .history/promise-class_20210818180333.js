const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MPromise {
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
    if (this.status === PENDING) {
      this.value = value;
      this.status = FULFILLED;
    }
  }

  reject(reason) {
    if (this.status === PENDING) {
      this.reason = reason;
      this.status = REJECTED;
    }
  }

  then(onFulfilled, onRejected) {
    const realOnFulfilled = this.isFunction(onFulfilled) ? onFulfilled : (value) => {
      return value;
    }

    const realOnRejected = this.isFunction(onRejected) ? onRejected : (reason) => {
      throw reason;
    }
  }

  isFunction(value) {
    return typeof value === 'function';
  }
}

const promise = new MPromise((resolve, reject) => {

});