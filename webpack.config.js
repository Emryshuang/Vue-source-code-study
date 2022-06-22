const path = require('path')
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        // path: path.resolve(__dirname,'../dist'),
        path: undefined,
        filename: 'static/js/index.js',
        // clean: true
    },
    module: {
        rules: [{}],
    },
    plugins: [
        new htmlWebpackPlugin({ template: path.resolve(__dirname, "./public/index.html") }),
    ],
    devServer: {
        host: "localhost", // 启动服务器域名
        port: "3000", // 启动服务器端口号
        open: true, // 
        hot: true
    },
    mode: 'development',
    devtool: "cheap-module-source-map"
}