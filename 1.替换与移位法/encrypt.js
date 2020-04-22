/**
 * 此处以移替换法为例
 * 1. 产生加密规则 -- mapping
 * 2. 根据规则进行文本替换
 */
exports.default = (text) => {
    const mapping = createRole()
    let rss = []
    for (let i = 0; i < text.length; i++) {
        // 获取字母
        let letter = text[i]
        rss.push(mapping[letter] || letter)
    }
    return [rss.join(''), mapping]
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