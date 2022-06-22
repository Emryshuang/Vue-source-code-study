const path = require('path')
const htmlWebpackPlugin = require("html-webpack-plugin");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        // path: path.resolve(__dirname,'../dist'),
        path: undefined,
        filename: 'static/js/index.js',
        // clean: true
    },
    module: {
        rules: [{
            oneOf: [{
                test: /\.js$/,
                // exclude: /node_modules/, // 排除node_modules代码不编译
                include: path.resolve(__dirname, "./src"), // 也可以用包含
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true, // 开启babel编译缓存
                            cacheCompression: false, // 缓存文件不要压缩
                            plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
                        },
                    },
                ],
            },]
        }],
    },
    plugins: [
        new ESLintWebpackPlugin({
            // 指定检查文件的根目录
            context: path.resolve(__dirname, "./src"),
            exclude: "node_modules", // 默认值
            cache: true, // 开启缓存
            // 缓存目录
            cacheLocation: path.resolve(
                __dirname,
                "./node_modules/.cache/.eslintcache"
            ),
        }),
        new htmlWebpackPlugin({ template: path.resolve(__dirname, "./public/index.html") })

    ],
    resolve: {
        // 自动补全文件扩展名
        extensions: [".js", ".json"],
        // 路径别名
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    devServer: {
        host: "localhost", // 启动服务器域名
        port: "3000", // 启动服务器端口号
        open: true, // 
        hot: true
    },
    mode: 'development',
    devtool: "cheap-module-source-map"
}