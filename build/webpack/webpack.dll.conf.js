const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const {
    type,
    project
} = require('../lib/project');
const {
    extraEntry
} = require('../lib/multipages');
let projectDir = path.resolve(__dirname, '../../src/' + project);
// let pagesDir = path.resolve(__dirname, '../../src/' + project + '/pages'); //项目多页面的pages目录
// let VUE = process.env.VUE || null;
// console.log(VUE);
// // 多页面情况下，对所有pages添加dll 
// let extraHtmlWebpackPlugins = [];
// if (type === 'multi') {
//     for (let i in extraEntry) {
//         extraHtmlWebpackPlugins.push(
//             new HtmlWebpackPlugin({
//                 filename: pagesDir + '/' + i + ".html",
//                 template: VUE ? (projectDir + '/index.html') : (pagesDir + '/' + i + ".html"),
//             }),
//             new HtmlWebpackIncludeAssetsPlugin({
//                 assets: ['../static/js/vendor.dll.js'],
//                 append: false
//             })
//         );
//     }

// }


const dllConfig = {
    mode: process.env.NODE_ENV,
    entry: {
        'vendor': ['vue/dist/vue.esm.js', 'vue-router', 'axios']
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