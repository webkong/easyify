const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
    type,
    project
} = require('../lib/project');
const {
    extraEntry
} = require('../lib/multipages');



const projectDir = path.resolve(__dirname, '../../src/' + project);
const conf = require(projectDir + '/config.js');

const dllConfig = {
    mode: process.env.NODE_ENV,
    entry: {
        'vendor': conf.vendor || ['vue/dist/vue.esm.js', 'vue-router', 'axios', 'jquery']
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
console.log(dllConfig);
module.exports = dllConfig;