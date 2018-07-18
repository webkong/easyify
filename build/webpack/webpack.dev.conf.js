const webpack = require("webpack");
const merge = require('webpack-merge')
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const baseConfig = require("./webpack.base.conf");
const config = require('../config/index');
const {
    type,
    project
} = require('../lib/project');
//多页面情况
let extraEntry = [];
let extraHtmlWebpackPlugins = [];
if (type === 'multi') {
    const multiBuilder = require("../lib/multipages");
    extraEntry = multiBuilder.extraEntry;
    extraHtmlWebpackPlugins = multiBuilder.extraHtmlWebpackPlugins;
}
let projectDir = path.resolve(__dirname, '../../src/' + project);
let distProjectDir = path.resolve(__dirname, '../../dist/' + project);
const webpackConfig = merge(baseConfig, {
    module: {
        rules: [{
            test: /\.(scss|sass|css)$/,
            use: [
                'style-loader', 'css-loader', 'postcss-loader', 'sass-loader'
            ]
        }]
    },
    devtool: false,
    plugins: [
        new HtmlWebpackPlugin({
            filename: distProjectDir + "/index.html",
            template: projectDir + "/index.html",
            chunks: ["index", "vendor"]
        }),
        ...extraHtmlWebpackPlugins,
        new VueLoaderPlugin(),
        // new CleanWebpackPlugin(['dist'], {
        //     root: path.resolve(__dirname, '../../')
        // }),
        new webpack.DefinePlugin({
            'process.env': config.dev
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
        new CopyWebpackPlugin([{
            from: projectDir + '/static',
            to: distProjectDir + '/static',
            ignore: ['.*']
        }]),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(projectDir + '/static/manifest.json')
        })
    ],
    devServer: {
        host: '0.0.0.0',
        // hot: true,
        // open: true,
        port: 5000
        // proxy: {
        //   "/api": {
        //     target: "",
        //     pathRewrite: { "^/api": "" },
        //     changeOrigin: true,
        //     secure: false
        //   }
        // }
    }
});
module.exports = webpackConfig;