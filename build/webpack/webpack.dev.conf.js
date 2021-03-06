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
if (config.multi || multi === 'true') {
    const multiBuilder = require("../lib/multipages");
    extraHtmlWebpackPlugins = multiBuilder.extraHtmlWebpackPlugins;
}
let projectDir = path.resolve('./src/' + project);

// 如果不需要 dll 文件
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
    mode: 'development',
    module: {
        rules: [{
            test: /\.(css)$/,
            use: [
                'style-loader', 'css-loader', 'postcss-loader'
            ]
        }, {
            test: /\.(scss|sass)$/,
            use: [
                'style-loader', 'css-loader', 'postcss-loader', 'sass-loader'
            ]
        }, {
            test: /\.(styl)$/,
            use: [
                'style-loader', 'css-loader', 'postcss-loader', 'stylus-loader'
            ]
        },{
            test: /\.(less)$/,
            use: [
                'style-loader', 'css-loader', 'postcss-loader', 'less-loader'
            ]
        }]
    },
    // devtool: "source-map",
    devtool: false,
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             commons: {
    //                 test: /[\\/]node_modules[\\/]/,
    //                 name: "vendor",
    //                 chunks: "all"
    //             }
    //         }
    //     }
    // },
    plugins: [
        // new CleanWebpackPlugin(['dist'], {
        //     root: path.resolve(__dirname, '../../')
        // }),
        new webpack.DefinePlugin({
            'process.env': config.env.dev
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: projectDir + "/index.html",
            chunks: ["index"]
        }),

        new VueLoaderPlugin(),
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
        new CopyWebpackPlugin([{
            from: projectDir + '/static/js/',
            to: 'static/js/',
            ignore: ['.*']
        },{
            from: projectDir + '/static/images/',
            to: 'static/images/',
            ignore: ['.*']
        }]),
        // new CopyWebpackPlugin([{
        //     from: projectDir + '/assets',
        //     to: 'assets',
        //     ignore: ['.*']
        // }]),
        new webpack.HotModuleReplacementPlugin(),
        ...extraHtmlWebpackPlugins,
        ...dllRef
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