const webpack = require("webpack");
const merge = require('webpack-merge')
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const baseConfig = require("./webpack.base.conf");
const config = require('../config/index');
const {
    multi,
    project,
    gzip
} = require('../lib/project');
//多页面情况
let extraHtmlWebpackPlugins = [];
if (multi === 'true') {
    const multiBuilder = require("../lib/multipages");
    extraHtmlWebpackPlugins = multiBuilder.extraHtmlWebpackPlugins;
}
// gizp
let extraGzip = [];
if (gzip === 'true') {
    extraGzip = [
        new CompressionPlugin({
            test: /\.(js|css|html)$/,
            algorithm: 'gzip'
        })
    ];
}

let projectDir = path.resolve(__dirname, '../../src/' + project);
let distProjectDir = path.resolve(__dirname, '../../dist/' + project);
// default vender
    let dllRef = []
if (config.vender && config.lenght > 0) {
    dllRef = [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(projectDir + '/static/manifest.json')
        })
    ]
}

const webpackConfig = merge(baseConfig, {
    mode: 'production',
    module: {
        rules: [{
            test: /\.(scss|sass|css)$/,
            use: [
                MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'
            ]
        }]
    },
    devtool: false,
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, '../../')
        }),
        new UglifyJsPlugin({
            test: /\.js($|\?)/i
        }),
        new webpack.DefinePlugin({
            'process.env': config.prod
        }),
        new HtmlWebpackPlugin({
            filename: distProjectDir + "/index.html",
            template: projectDir + "/index.html",
            chunks: ["index"],
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                chunksSortMode: 'dependency'
            }
        }),
        ...extraHtmlWebpackPlugins,
        new VueLoaderPlugin(),
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: '../css/[name].[hash:5].css'
        }),
        new CopyWebpackPlugin([{
            from: projectDir + '/static',
            to: distProjectDir + '/static',
            ignore: ['.*']
        }]),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(projectDir + '/static/manifest.json')
        }),
        ...extraGzip
    ]
});
console.log(webpackConfig);
module.exports = webpackConfig;