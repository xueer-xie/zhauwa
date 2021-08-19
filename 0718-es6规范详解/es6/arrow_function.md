## arrow_function 箭头函数
```js
  // ES5
  // 传统函数
  function sum(a, b) {
    return a + b;
  }
  // 传统函数表达式
  const sum1 = function(a, b) {
    return a + b;
  }
  sum(1, 1);
  sum1(1, 1);
```

### 箭头函数结构
```js
  // ES6
  const sum2 = (a, b) => {
    return a + b;
  }
  const sum3 = (a, b) => a + b;
  const sum4 = x => {
    // 逻辑
  };
```

### 上下文 - this
```js
  const obj2 = {
    teacher: '云隐',
    leader: '黄小杨',
    zhuawa: ['部部', '小可'],
    getTeacher: function() {
      return this.teacher;
    },
    getLeader: () => {
      return this.leader;
    },
  };

  obj2.getTeacher();
  obj2.getLeader();
```
### 追问 为何箭头函数无法get到属性 => this
### 箭头函数上下文场景
#### 1. dom操作cb
```js
  // <button id="btn"></button>
  const btn = document.querySelector('#btn');
  btn.addEventListener('click', function() {
    this.style.width = '100%';
  })
```

#### 2. 类操作
```js
  // 箭头函数无法构造类
  function Obj(teacher, leader) {
    this.teacher = teacher;
    this.leader = leader;
  }
  const Obj = (teacher, leader) => {
    this.teacher = teacher;
    this.leader = leader;
  }

  const o1 = new Obj('云隐', '黄小杨');

  // * 箭头函数可否构造原型方法 - 箭头函数无法构造原型上的方法
  Obj.prototype.course = function() {
    console.log(`${this.teacher}&${this.leader}`);
  }
  Obj.prototype.course2 = () => {
    console.log(`${this.teacher}&${this.leader}`);
  }
```

### 箭头函数的参数 - 箭头函数是没有arguments
```js
  const sum = function (a, b) {
    console.log(arguments);
  }
  const sum1 = (a, b) => {
    console.log(arguments);
  }
```
