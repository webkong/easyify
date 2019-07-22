const webpack = require("webpack");
const merge = require('webpack-merge')
const path = require("path");
const os = require('os');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
//拆分css样式的插件
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
console.log(multi)
if (config.multi || multi === 'true') {
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
let dllRef = [];
if (config.vendor && config.vendor.length > 0) {
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
            test: /\.(css)$/,
            use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        // by default it use publicPath in webpackOptions.output
                        publicPath: '../../'
                    }
                },
                'css-loader', 'postcss-loader'
            ]
        }, {
            test: /\.(scss|sass)$/,
            use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        // by default it use publicPath in webpackOptions.output
                        publicPath: '../../'
                    }
                },
                'css-loader', 'postcss-loader', 'sass-loader'
            ]
        }, {
            test: /\.(styl)$/,
            use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        // by default it use publicPath in webpackOptions.output
                        publicPath: '../../'
                    }
                },
                'css-loader', 'postcss-loader', 'stylus-loader'
            ]
        }, {
            test: /\.(less)$/,
            use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        // by default it use publicPath in webpackOptions.output
                        publicPath: '../../'
                    }
                },
                'css-loader', 'postcss-loader', 'less-loader'
            ]
        }]
    },
    devtool: false,
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, '../../')
        }),
        // minify JavaScript
        new UglifyJsPlugin({
            test: /\.js($|\?)/i,
            parallel: true,
            cache: true
        }),
        new webpack.DefinePlugin({
            'process.env': config.env.prod
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
            filename: 'static/css/[name].[hash:5].css',
        }),
        new CopyWebpackPlugin([{
            from: projectDir + '/static/js/',
            to: distProjectDir + '/static/js/',
            ignore: ['.*']
        },{
            from: projectDir + '/static/images/',
            to: 'static/images/',
            ignore: ['.*']
        }]),
        ...dllRef,
        ...extraGzip
    ]
});
module.exports = webpackConfig;