const path = require("path");
const webpack = require('webpack');
const  HtmlWebpackPlugin = require('html-webpack-plugin');
const VENDORS = ["react","react-dom","react-redux","react-router","react-router-redux","redux"];
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
            },
            /*  {
             loader: ExtractTextPlugin.extract({loader: 'css-loader'}),
             test: /\.css$/
             }*/
        ]
    },
    plugins: [
        // new ExtractTextPlugin('style.css'), // Combine all css in one "style.css"
        new webpack.optimize.CommonsChunkPlugin({ // Divide all mutable and immutable
            name: ['vendor', 'manifest']
        }),
        new HtmlWebpackPlugin({ // Embed bundle.js in proposed .html files
            template: './public/index.html',

        })
    ],
    watch: true,
    watchOptions:{
        ignored: /node_modules/
    }
}