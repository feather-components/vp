var path = require('path');
var webpack = require('webpack');
var HtmlWepackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    watch: process.env.NODE_ENV != 'ci',

    entry: {
        main: './src/index',
        lib: ['vue', 'vue-router'],
        vpui: '../src'
    },

    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
            vpui: path.resolve(__dirname, '../src/index.js'),
            type: 'type-of',
            ajax: 'component-ajax'
        },
        extensions: ['.js', '.vue']
    },

    output: {
        path: path.resolve(__dirname, '_build_'),
        filename: '[name].js',
        library: 'this',
        libraryTarget: 'umd'
    },

    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    postcss: [require('autoprefixer')()]
                }
            },

            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader'
            },

            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },

            {
                test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
                loader: 'url-loader'
            }
        ]
    },

    plugins: [
        new CopyWebpackPlugin([{
            from: './src/iconfont.*',
            to: '../_build_/',
            flatten:true
        },{
            from: './src/*.css',
            to: '../_build_/',
            flatten:true
        }]),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vpui', 'lib'],
        }),
        new HtmlWepackPlugin({
            template: './src/index.html'
        })
    ]
};