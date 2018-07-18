const webpack = require('webpack');
const path = require('path');
const {
    project
} = require('../lib/project');
let projectDir = path.resolve(__dirname, '../../src/' + project);
let distProjectDir = path.resolve(__dirname, '../../dist/' + project);

module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        'vendor': ['vue/dist/vue.esm.js', 'vue-router', 'axios']
    },
    output: {
        path: distProjectDir + '/static/js',
        filename: '[name].dll.js',
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
            context: __dirname, // 必填项，用来标志manifest中的路径
            path: projectDir + '/static/manifest.json', // 必填项，存放manifest的路径
            name: '[name]' // 必填项，manifest的name
        })
    ]
};