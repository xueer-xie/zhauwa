const xhr = XMLHttpRequest();

xhr.open('GET', 'http://domain/serve');

xhr.onreadstatechange = function () {
  if (xhr.readyState !== 4) {
    return;
  }

  if (xhr.status === 200) {
    console.log(xhr.responseText);
  } else {
    console.error(`HTTP error, status = ${xhr.status}, errorText=${xhr.statusText}`);
  }
}

// 设置超时
xhr.timeout = 3000;
xhr.ontimeout = () => {
  console.log('当前请求超时了');
}

xhr.upload.onprogress = p => {
  const percent = Math.round((p.loaded / p .total) * 100) + '%';
}
xhr.send();


// fetch
fetch('http://domain/serve', {
  method: 'GET',
  credentials: 'same-origin',
}).then(response => {
  if (response.ok) {
    // 请求成功
    return response.json();
  }
  throw new Error('http error');
}).then(json => {
  console.log(json);
}).catch(error => {
  console.log(error);
})

// fetch 目前了解不支持超时
// 自封装的超时逻辑
function fetchTimeout(url, init, timeout = 3000) {
  return new Promise((resolve, reject) => {
    fetch(url, init).then(resolve).catch(reject);
    setTimeout(reject, timeout);
  })
}

// 终断 fetch
const controller = new AbortController();

fetch('http://domain/serve', {
  method: 'GET',
  credentials: 'same-origin',
  signal: controller.signal // 
}).then(response => {
  if (response.ok) {
    // 请求成功
    return response.json();
  }
  throw new Error('http error');
}).then(json => {
  console.log(json);
}).catch(error => {
  console.log(error);
})

controller.abort(); // 中断fetch请求

// 课后小作业
// 尝试封装一个通用的异步函数的超时逻辑
