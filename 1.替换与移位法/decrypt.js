/**
 * 频率分析法
 * 
 * 英语中,字母的概率
 * 
 * e:12.7
 * t:9.1
 * a:8
 * o:7.6
 * i:7.5
 * n:7.2
 * s
 * r
 * h
 * 。。。
 * 
 * 只要密文充足,可根据概率进行转换
 */
exports.default = (text) => {
    // 概率表
    var mapping = {}
    // 有效字母次数
    var count = 0
    for (let i = 0; i < text.length; i++) {
        const letter = text[i]
        if ((letter >= 'a' && letter <= 'z')) {  //|| (letter >= 'A' && letter <= 'Z')) {
            mapping[letter] = mapping[letter] || 0
            mapping[letter]++
            count++
        }
    }

    let mappingVK = {}
    // 转换概率表
    for (let key of Object.keys(mapping)) {
        mapping[key] = mapping[key] / count * 100
        mappingVK[mapping[key]] = key
    }
    // 将前几位依次转换为
    let arr = ['e', 't', 'a', 'o', 'i', 'n', 's', 'r', 'h', 'l'] // 省写
    // 根据value进行排序 ----- 应该是根据概率表附近,进行猜测
    let sortArr = Object.values(mapping).sort((a, b) => {
        return b - a
    })
    let rs = {}
    // 将arr 与 sortArr 对应即可
    for (let i = 0; i < arr.length; i++) {
        rs[arr[i]] = mappingVK[sortArr[i]]
    }

    return rs
}