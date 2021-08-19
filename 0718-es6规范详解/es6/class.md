## class 助力js更加面向对象了 - 类
```js
//传统对象 - function
function Course(teacher, course) {
  this.teacher = teacher;
  this.course = course;
}
Course.prototype.getCourse = function() {
  return `teacher: ${this.teacher}, course: ${this.course}`;
}

const course = new Course('YY', 'ES6');

// ES6
class Course {
  constructor(teacher, course) {
    this.teacher = teacher;
    this.course = course;
  }
  getCourse() {
    return `teacher: ${this.teacher}, course: ${this.course}`;
  }
}
const course = new Course('YY', 'ES6');
```

## 追问 - class本质是语法糖
### *class 是什么类型？ - function
```js
console.log(typeof Course);
```

### *class是否有prototype? - 一致
```js
console.log(Course.prototype);
```

### *class可以使用对象方法&属性么
```js
console.log(course.hasOwnProperty('teacher'));
```

### 属性定义 两种定义属性的方式： 构造器 & 顶层定义
```js
class Course {
  constructor(teacher, course) {
    this._teacher = teacher;
    this.course = course;
  }
  getCourse() {
    return `teacher: ${this._teacher}, course: ${this.course}`;
  }
  get teacher() {
    return this._teacher;
  }
  set teacher(val) {
    this._teacher = val;
  }
}
const course = new Course('YY', 'ES6');

// 意义何在？
// 1. 建立只读变量， *js如何建立只读变量
class Course1 {
  constructor(teacher, course) {
    this._teacher = teacher;
    this.course = course;
  }
  getCourse() {
    return `teacher: ${this._teacher}, course: ${this.course}`;
  }
  get teacher() {
    return this._teacher;
  }
}
const course1 = new Course1('YY', 'ES6');
course1.teacher = '222';
// 修改只读变量会报错么？ - 无法改变，但不会报错

// 2. *js中如何实现一个私有属性 - 闭包
class Course2 {
  constructor(teacher, course) {
    this._teacher = teacher;
    // 在constructor作用域中定义局部变量，内部通过闭包的形式对外暴露该变量
    let _course = 'es6';

    this.getCourse = () => {
      return _course;
    }
  }
}

class Course3 {
  #course = 'es6';
  constructor(teacher, course) {
    this._teacher = teacher;
    }
  }
  get course() {
    return `${#course}~`;
  }
  set course(val) {
    if (val) {
      this.#course = val;
    }
  }
}

// 3. 封装核心 - 适配器模式
// 底层封装好通用core服务
class Utils {
  constructor(core) {
    this._main = core;
    this._name = 'myName';
  }
  get name() {
    ...this._main.name,
    name: ${this._name}
  }
  set name(val) {
    this._name = val;
  }
}
```

### 静态方法 - 直接挂载，无需实例化即可获取
```js
  // ES5
  function Course(teacher, course) {
    this._teacher = teacher;
    this.course = course;
  }
  Course.call = function() {
    console.log('calling');
  }

  // ES6
  class Course {
    constructor(teacher, course) {
      this._teacher = teacher;
    }
    static call () {
      console.log('calling');
    }
  }
```

### 继承 - js如何继承
```js
  // ES5 继承
  function Course(teacher, course) {
    this._teacher = teacher;
    this.course = course;
  }
  Course.call = function() {
    console.log('calling');
  }
  Course.prototype.send = function() {
    console.log('sending');
  }

  // 如何继承
  // 子对象
  function Child() {
    // 初始化父类
    Course.call(this, '云隐', 'ES6');
    this.start = function() {
      console.log('starting');
    }
  }
  Child.prototype = Course.prototype;

  // ES6
  // 父类
  class Course {
    constructor(teacher, course) {
      this._teacher = teacher;
      this.course = course;
    }
    send() {
      console.log('sending');
    }
    static call() {
      console.log('calling');
    }
  }

  // 子类
  class Child extends Course {
    constructor() {
      super('云隐', 'ES6');
    }
    start() {
      console.log('starting');
    }
  }
```
