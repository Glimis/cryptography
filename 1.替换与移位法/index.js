const encrypt = require('./encrypt').default
const decrypt = require('./decrypt').default

const fs = require('fs')


const text = fs.readFileSync('../text.txt', 'utf-8')

const [newText, mapping] = encrypt(text)

let decryptmapping = decrypt(newText)

for (let key in mapping) {
    if (decryptmapping[key]) {
        mapping[key] = [mapping[key], decryptmapping[key]]
    }
}
console.log('第一个为实际转换,第二个为猜测', mapping)