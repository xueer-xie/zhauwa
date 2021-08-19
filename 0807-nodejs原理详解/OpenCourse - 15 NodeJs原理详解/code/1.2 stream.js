const Transform = require('stream').Transform

class Rotate extends Transform {
    constructor(n) {
        super()
        // 将字母移动`n`个位置
        this.offset = (n || 13) % 26
    }

    // 将可写端写入的数据变换后添加到可读端
    _transform(buf, enc, next) {
        var res = buf.toString().split('').map(c => {
            var code = c.charCodeAt(0)
            if (c >= 'a' && c <= 'z') {
                code += this.offset
                if (code > 'z'.charCodeAt(0)) {
                    code -= 26
                }
            } else if (c >= 'A' && c <= 'Z') {
                code += this.offset
                if (code > 'Z'.charCodeAt(0)) {
                    code -= 26
                }
            }
            return String.fromCharCode(code)
        }).join('')

        // 调用push方法将变换后的数据添加到可读端
        this.push(res)
        // 调用next方法准备处理下一个
        next()
    }

}

var transform = new Rotate(3)
transform.on('data', data => process.stdout.write(data))
transform.write('hello, ')
transform.write('world!')
transform.end()

// abcdefgh