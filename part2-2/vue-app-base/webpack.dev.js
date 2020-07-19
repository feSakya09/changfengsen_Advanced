const webpack = require('webpack')
const merge = require('webpack-merge');
const commonWebpackConfig = require('./webpack.common')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(commonWebpackConfig, {
    mode: 'development',
    devtools: 'cheap-module-eval-source-map',
    devServer: {
        hotOnly: true,
        baseContent: '/public',
        proxy: {
            '/api': {
                target: 'https://api.github.com/',
                pathRewrite: {
                    '^/api': ''
                },
                changeOrigin: true
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
})