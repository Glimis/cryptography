const encrypt = require('./encrypt').default
const decrypt = require('./decrypt').default

const fs = require('fs')


const text = fs.readFileSync('../text.txt', 'utf-8')

const [newText, mapping] = encrypt(text, 'password')


let decryptmapping = decrypt(newText)


console.log('密码长度可能性', decryptmapping)
console.log('实际长度', mapping.length)
console.log('根据长度提取密文,进行概率分析即可')


