## const 标识常量
```js
const AREA = 10;
const OBJ_MAP = {
  a: 'A',
  A: 'a'
};
const PIPE_LINE = [1, 2, 3, 5, 4];
```

### 1. 不允许重复声明
```js
var arg1 = '云隐';
arg1 = '黄小杨';

// 常量
// *如何定义一个常量?
// ES5
Object.defineProperty(window, 'arg2', {
  value: '云隐',
  writable: false
});
// *会不会报错，能不能修改？
arg2 = '黄小杨';

// ES6
// *能不能被改变？ 会不会报错
const arg3 = '云隐';
arg3 = '黄小杨';

// *const可以分开声明赋值么？
const arg4;
arg4 = '云隐';

var arg5 = '云隐';
var arg5 = '黄小杨';

// const不允许重复声明
const arg5 = '云隐';
const arg5 = '黄小杨';
```

### 2. 块级作用域
```js
const PERMIT = 'true';

if(PERMIT) {
  var arg1 = '云隐';
}
console.log(arg1);

// const
if(PERMIT) {
  const arg2 = '云隐';
}
console.log(arg2);
```

### 3. 无变量提升
```js
console.log(arg3);
var arg3 =  '云隐';

// 无变量提升-先声明再使用
console.log(arg4);
const arg4 = '云隐';


var arg5 = '云隐';
console.log(window.arg5);
// const 不在window中
const arg6 = '云隐';
console.log(window.arg6);
```

### 4. dead zone
```js
const PERMIT = 'true';
if(PERMIT) {
  // 暂时性死区
  console.log(arg1);
  const arg1 = '云隐';
}
```

### 5. let
#### let 和 const 啥时候用
* bad - 优先使用let，常量时候再去使用const
* prefer - 优先使用const

### 面试附加题
```js
  // *引用类型的内部属性值无法被常量化
  const obj = {
    teacher: '云隐',
    leader: '黄小杨'
  }
  obj.teacher = '黄小杨';

  const arr = ['云隐', '黄小杨'];
  arr[0] = '黄小杨';

  // * 引用类型如何冻结 原理 - 指向地址
  // 破局 - Object.freeze();
  Object.freeze(obj); //*可否被修改？会报错么？

  // *进一步追问 - 符合类型的对象可否freeze？
  const obj2 = {
    teacher: '云隐',
    leader: '黄小杨',
    zhuawa: ['部部', '小可']
  };
  Object.freeze(obj2); // freeze无法冻结嵌套引用类型

  // *如何破局
  // freeze如何做deep化。
  // 思路： 嵌套遍历并且逐层freeze
  function deepFreeze(obj = {}) {
    Object.freeze(obj);
    (Object.key(obj) || []).forEach(key => {
      if(type obj[key] === 'object') {
        deepFreeze(obj[key]);
      }
    })
  }
```
