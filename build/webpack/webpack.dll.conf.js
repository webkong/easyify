const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
    multi,
    project
} = require('../lib/project');


const projectDir = path.resolve(__dirname, '../../src/' + project);
const conf = require(projectDir + '/config.js');
if(conf.vendor.length === 0){
    throw new Error('Before dll bundle, you must set the key "vender" in config.js')
}
const dllConfig = {
    mode: process.env.NODE_ENV,
    entry: {
        'vendor': [...conf.vendor]
    },
    output: {
        path: projectDir + '/static/js',
        filename: '[name].dll.js',
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
            context: __dirname, // 必填项，用来标志manifest中的路径
            path: projectDir + '/static/manifest.json', // 必填项，存放manifest的路径
            name: '[name]_library' // 必填项，manifest的name
        }),
        //创建dll的时候给html添加相应的代码
        new HtmlWebpackPlugin({
            filename: projectDir + "/index.html",
            template: projectDir + "/index.html",
            inject: 'body'
        })
    ]
};
module.exports = dllConfig;