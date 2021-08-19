## 解构 - 解开结构
```js
// 对象型
const zhuawa = {
  teacher: '云隐',
  leader: '黄小杨'
}

const teacher = zhuawa.teacher;
const leader = zhuawa.leader;

// es6
//
const {
  teacher,
  leader
} = zhuawa;

// 数组
const arr = ['', '', '', ''];
const a = arr[0];
const b = arr[1];
// ...
//
const [a, b, c, d] = arr;
```

### 技巧 key解构
```js
  const zhuawa = {
    teacher: {
      name: '云隐',
      age: 30
    },
    leader: '黄小杨',
    name: 'es6'
  }

  // const {
  //   teacher,
  //   leader,
  //   name
  // } = zhuawa;
  //
  // key 别名
  const {
      teacher: {
        name,
        age
      },
      leader,
      name: className
  } = zhuawa;
  // name age className leader
```

### 追问 解构 使用场景/什么情况下使用过
```js
  // 数组传参
  const sum = arr => {
    let res = 0;

    arr.forEach(each => {
      res += each;
    })
  }

  // es6
  const sum = ([a, b, c]) => {
    return a + b +c;
  }

  sum([1, 1, 1]);
```

### 结合初始值
```js
  const course = ({
    teacher,
    leader,
    course = 'zhuawa'
  }) => {
    // ……
  }

  course({
    teacher: 'yy',
    leader: 'hxy',
    // course: 'es6'
  })
```

### 返回值
```js
  const getCourse = () => {
    return {
      teacher: 'yy',
      leader: 'hxy'
    }
  }

  const { teacher, leader } = getCourse();
```

### 变量交换
```js
  let a = 1;
  let b = 2;

  [b, a] = [a, b];
```

### json处理
```js
  const json = '{"teacher": "云隐", "leader": "黄小杨"}';

  const obj = JSON.parse(json);

  const {
    teacher,
    leader
  } = JSON.parse(json);
```

### ajax
```js
  ajax.get(URL).then(res => {
    let code = res.code;
    let data = res.data;
    let msg = res.msg;

    if (code === 0) {
      // ...
    }
  })

  const {
    code,
    data,
    msg
  } = res;
```
