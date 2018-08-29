const path = require("path");
const {
    multi,
    project,
    env
} = require('../lib/project');
const config = require('../config/index');
//多页面情况
let extraEntry = [];
if (multi === 'true' || config.multi) {
    const multiBuilder = require("../lib/multipages");
    extraEntry = multiBuilder.extraEntry;
}
let projectDir = path.resolve(__dirname, '../../src/' + project);
let distProjectDir = path.resolve(__dirname, '../../dist/' + project);

// defalut vendor
let optimization = {};
if (config.vendor && config.vendor.length === 0) {
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
    };
}

const baseConfig = {
    mode: process.env.NODE_ENV,
    entry: {
        index: projectDir + '/index.js',
        ...extraEntry
    },
    output: {
        path: distProjectDir,
        filename: "static/js/[name].js",
        publicPath: env === 'prod' ? './' : '/'
    },
    devtool: "source-map",
    resolve: {
        extensions: ['.js', '.vue', '.jsx', '.json'],
        alias: {
            Utils: projectDir + "/utils",
            Lib: projectDir + "/lib",
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                use: "vue-loader"
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 1000,
                    // name: env === 'prod' ? "static/images/[name].[hash:5].[ext]" : "static/images/[name].[hash:5].[ext]"
                    name: "static/images/[name].[hash:5].[ext]"
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/fonts/[name].[hash:5].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:5].[ext]'
                }
            },
        ]
    }
    // optimization: optimization
};
module.exports = baseConfig;