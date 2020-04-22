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
    // 分析text相同单词的间隔
    // 1. 简易的单词分析,通过空格,获取所有单词
    let words = text.split(/\s+/)

    // 2. 获取重复次数
    const worderCount = {}
    for (let word of words) {
        worderCount[word] = worderCount[word] || 0
        worderCount[word]++
    }
    // 3. kv转换与排序
    let worderCountVK = {}
    for (let key in worderCount) {
        worderCountVK[worderCount[key]] = worderCountVK[worderCount[key]] || []
        worderCountVK[worderCount[key]].push(key)
    }
    // 去重与排序
    let _arr = Object.values(worderCount)
    let set = new Set()
    for (let i = 0; i < _arr.length; i++) {
        set.add(_arr[i])
    }
    let sortArr = Array.from(set).sort((a, b) => {
        return b - a
    })

    // 4.获取重复单词个数信息
    let infos = []
    for (let i = 0; i < sortArr.length; i++) {
        if (sortArr[i] > 9) {
            infos.push({
                count: sortArr[i],
                value: worderCountVK[sortArr[i]]
            })
        }
    }

    // 5. 猜测密码长度
    let secretCountMapping = {}
    for (let i = 0; i < infos.length; i++) {
        let { value } = infos[i]

        // values为数组
        value.forEach((value) => {

            // 获取value之间的间隔长度 ,此处省略了第一个和最后一个单词
            text.split(new RegExp(' ' + value + ' ')).forEach((val) => {
                // if (val.length < 10) {
                // console.log(val, val.length, value, '.....................')
                // }
                let size = val.length + value.length + 2
                secretCountMapping[size] = secretCountMapping[size] || {
                    // 间隔应该+1
                    value: size,
                    count: 0
                }
                secretCountMapping[size].count++
            })
        })
    }
    // 合并,对于3次而言,6次也属于3次
    let keys = Object.keys(secretCountMapping)
    for (let i = 0; i < keys.length; i++) {
        // 将后续模运算相同的key的count,合并
        let key = keys[i]
        for (let j = i + 1; j < keys.length; j++) {
            if (keys[j] % key == 0) {
                secretCountMapping[key].count = secretCountMapping[key].count + secretCountMapping[keys[j]].count
            }
        }
    }

    // 去除10以内的数据
    const rs = {}
    for (let i = 0; i < keys.length; i++) {
        if (secretCountMapping[keys[i]].count > 10) {
            rs[keys[i]] = secretCountMapping[keys[i]]
        }
    }
    return rs
    // 密码可能长度判定
    // return probability(text)
}


function probability(text) {
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
    // console.log(mapping, 'mapping')
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