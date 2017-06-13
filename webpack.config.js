const path = require("path");
const webpack = require('webpack');
const  HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDORS = ["react","react-dom","react-redux","react-router","react-router-redux","redux","react-bootstrap-typeahead",""];
module.exports = {
    entry: {

        index: "./public/src/index.js",
        vendor: VENDORS
    },
    output: {
        path: __dirname + '/public/dist',
        filename: '[name].js'
    },
    devServer: {
        contentBase: './public',
        inline: true,
        historyApiFallback: true,
        isInfo: false
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                exclude: path.join(__dirname, 'node_modules'),
                test: /\.js$/
            }
        ]
    },
    plugins: [

        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'manifest']
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',

        })
    ],
    watch: true,
    watchOptions:{
        ignored: /node_modules/
    }
}