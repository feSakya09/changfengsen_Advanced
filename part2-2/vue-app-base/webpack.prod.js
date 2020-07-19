const commonWebpackConfig = require('./webpack.common')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

module.exports = merge(commonWebpackConfig, {
    mode: 'production',
    optimization: {
        usedExports: true,
        minimize: true,
        minimizer: [
            new OptimizeCssAssetsWebpackPlugin,
            new TerserWebpackPlugin
        ],
    },
    plugins: [
        new CopyWebpackPlugin('public'),
        new HtmlWebpackPlugin()
    ]
})