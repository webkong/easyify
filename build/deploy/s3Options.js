//https://docs.aws.amazon.com/zh_cn/general/latest/gr/rande.html
/**
 *  常用的region
    'us-east-1' // 美国东部 弗吉尼亚
    'ap-south-1' // 亚太地区 孟买
    'ap-southeast-1' // 亚太地区  新加坡
 */

let options = {
    apiVersion: '2006-03-01',
    endpoint: 'https://s3.amazonaws.com'
}

module.exports = function (region) {
    let re = null;
    switch (region) {
        case 'fjny':
            re = 'us-east-1'
        case 'mm':
            re = 'us-south-1'
        case 'xjp':
            re = 'us-southeast-1'
    }
    return {
        ...options,
        region: re
    }
}