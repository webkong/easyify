const ip = require("ip");

const devServer = {
    host: '0.0.0.0'//ip.address()
    // proxy: {
    //   "/api": {
    //     target: "",
    //     pathRewrite: { "^/api": "" },
    //     changeOrigin: true,
    //     secure: false
    //   }
    // }
};

module.exports = devServer;
