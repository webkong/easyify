const path = require("path");
const {
    multi,
    project
} = require('../lib/project');
const config = require('../config/index');
//多页面情况
let extraEntry = [];
console.log(multi, project)
if (multi === 'true') {
    console.log('multi xxxxxxx')
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
        path: distProjectDir + '/static/js',
        filename: "[name].js",
        publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
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
                    name: process.env.NODE_ENV === 'production' ? "../assets/images/[name].[hash:5].[ext]" : "assets/images/[name].[hash:5].[ext]"
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: process.env.NODE_ENV === 'production' ? '../assets/fonts/[name].[hash:5].[ext]' : 'assets/fonts/[name].[hash:5].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: process.env.NODE_ENV === 'production' ? '../assets/media/[name].[hash:5].[ext]' : 'assets/media/[name].[hash:5].[ext]'
                }
            },
        ]
    }
    // optimization: optimization
};
module.exports = baseConfig;