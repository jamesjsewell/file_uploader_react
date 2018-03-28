const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack') //to access built-in plugins
const path = require('path')

module.exports = merge(common, {
    target: 'web',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",            
                ]
            }
        ]
    },
    devServer: {

        hot: true,
        host: 'localhost',
        watchOptions: {
            poll: true
        },
        historyApiFallback: {
            index: 'index.html'
        }
    },
    devtool: 'inline-source-map',
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    output: {
        publicPath: "/"
    }
})



