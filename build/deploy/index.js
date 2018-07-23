const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const s3Option = require('./s3Options')('xjp');
const s3 = new AWS.S3(s3Option);
const {
    project
} = require('../lib/project');
// 本来打算用aws-sdk的putObject方法来上传文件到s3,但是发现性能一般，要用fs遍历每个层级的文件夹，先放着
// const projectDistDir = path.resolve(__dirname, '../../dist/' + project);
// fs.readdirSync(projectDistDir).map(filename => {
    
//     console.log(filename);
// })