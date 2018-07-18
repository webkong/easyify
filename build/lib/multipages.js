const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
    project
} = require('./project');
let reg = /\.\S+$/;
let pagesPath = {}; // 存储都页面的路径对象
let pagesDir = path.resolve(__dirname, '../../src/' + project + '/pages'); //项目多页面的pages目录
let projectSrcDir = path.resolve(__dirname, '../../src/' + project); //项目多页面的pages目录
let projectDistDir = path.resolve(__dirname, '../../dist/' + project); //项目多页面的pages目录
let VUE = process.env.VUE || null;
let minify = undefined;
if (process.env.NODE_ENV === 'production') {
    minify = {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        chunksSortMode: 'dependency'
    }
}
fs.readdirSync(pagesDir)
    .filter(filename => !reg.test(filename))
    .map(filename => {
        const jsReg = /\.js$/;
        const pagePath = fs
            .readdirSync(pagesDir + '/' + filename)
            .filter(filename => jsReg.test(filename));
        pagePath.map(name => {
            pagesPath[filename + "/" + name.replace(".js", "")] =
                pagesDir + "/" + filename + "/" + name;
        });
    });
// 生成entry
const extraEntry = pagesPath;
// 生成HtmlWebpackPlugin
let extraHtmlWebpackPlugins = [];
for (let i in pagesPath) {
    extraHtmlWebpackPlugins.push(
        new HtmlWebpackPlugin({
            filename: projectDistDir + '/' + i + ".html",
            template: VUE ? (projectSrcDir + '/index.html') : (pagesDir + '/' + i + ".html"),
            chunks: [i, "vendor"],
            minify: minify
        })
    );
}

module.exports = {
    extraEntry,
    extraHtmlWebpackPlugins
}