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
    multi,
    project
} = require('../lib/project');
//多页面情况
let extraHtmlWebpackPlugins = [];
if (multi === 'true') {
    const multiBuilder = require("../lib/multipages");
    extraHtmlWebpackPlugins = multiBuilder.extraHtmlWebpackPlugins;
}
let projectDir = path.resolve('./src/' + project);
const webpackConfig = merge(baseConfig, {
    mode: 'development',
    module: {
        rules: [{
            test: /\.(scss|sass|css)$/,
            use: [
                'style-loader', 'css-loader', 'postcss-loader', 'sass-loader'
            ]
        }]
    },
    devtool: false,
    optimization = {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all"
                }
            }
        }
    },
    plugins: [
        // new CleanWebpackPlugin(['dist'], {
        //     root: path.resolve(__dirname, '../../')
        // }),
        new webpack.DefinePlugin({
            'process.env': config.dev
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: projectDir + "/index.html",
            chunks: ["index", "vendor"]
        }),
        ...extraHtmlWebpackPlugins,
        new VueLoaderPlugin(),
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
        new CopyWebpackPlugin([{
            from: projectDir + '/static',
            to: 'static',
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
        hot: true,
        // open: true,
        port: 5000,
        index: 'index.html',
        contentBase: false,
        // publicPath: '/src/' + project,
        compress: true,
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