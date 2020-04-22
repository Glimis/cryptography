/**
 * 
 * 1. 产生加密规则 -- mapping
 * 2. 根据规则进行文本替换
 * 
 * secret 就是钥匙  ===》 长度越短,越好破解
 */
exports.default = (text, secret = 'secret') => {
    //  不同于以往,此处产生26套规则
    const roles = []
    for (let i = 0; i < 26; i++) {
        roles.push(createRole())
    }
    // 钥匙对应的规则
    const _roles = []
    for (let i = 0; i < secret.length; i++) {
        _roles.push(roles[secret[i].charCodeAt() - 97])
    }


    let rss = []
    for (let i = 0; i < text.length; i++) {
        var mapping = _roles[i % secret.length]
        // 获取字母
        let letter = text[i]
        rss.push(mapping[letter] || letter)
    }
    return [rss.join(''), _roles]
}


function createRole() {
    const arr = []
    // 1. 打乱顺序
    for (let i = 65; i < 65 + 26; i++) {
        // 只进行小写转换
        // arr.push(String.fromCharCode(i))
        arr.push(String.fromCharCode(i + 32))
    }

    let i = arr.length;
    while (i) {
        let j = Math.floor(Math.random() * i--);
        [arr[j], arr[i]] = [arr[i], arr[j]];
    }

    // 2. 映射
    const mapping = {}
    for (let i = 65; i < 65 + 26; i++) {
        // mapping[String.fromCharCode(i)] = arr.shift()
        mapping[String.fromCharCode(i + 32)] = arr.shift()
    }
    return mapping
}