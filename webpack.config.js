var path = require('path');
module.exports = { 
    entry: {
        pager:'./src/pager/examples/main.js',
    },
    output: {
        path: path.join(__dirname, './dest'), 
        filename: '[name]/examples/main.js' 
    },  
    module: { 
        rules: [  
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }, 
            { test: /\.css$/, loader: 'style-loader!css-loader!less-loader'}, 
            { test: /\.tpl$/, loader: 'html-loader' },
        ]
    }, 
    resolve: { 
        extensions: ['.js'], 
        alias: {
            '&&css':'../index.css',
            '&&js': '../index.js',
            '&&vue': '../../../vue/vue.js',
            '&&legoland': '../../../legoland.css',
        }
    }, 
    devtool: 'eval-source-map'
};