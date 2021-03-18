const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: {source: path.join(__dirname, "src", "index.tsx")},
    target: "web",
    resolve: {
        extensions: [".ts", ".js", ".tsx", ".jsx", ".less"]
    },
    module: {
        rules: [
            {
                exclude: path.join(__dirname, "node_modules"),
                test: /\.tsx?$/,
                use: [{loader: "ts-loader"}]
            },
            {
                // exclude: path.join(__dirname, "node_modules"),
                test: /\.(css|less)$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    {
                        loader: "less-loader",
                        options: {
                            lessOptions: {strictMath: true}
                        }
                    }
                ],
            },
            {
                exclude: path.join(__dirname, "node_modules"),
                test: /\.(eot|woff|woff2|ttf)$/,
                use: [{
                    loader: "file-loader",
                    options: {outputPath: "assets/fonts"}
                }]
            },
            {
                exclude: path.join(__dirname, "node_modules"),
                test: /\.(png|jpe?g|gif)$/,
                use: [{
                    loader: "file-loader",
                    options: {outputPath: "assets/images"}
                }]
            }
        ],
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "built")
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "index.html")
        })
    ]
};
