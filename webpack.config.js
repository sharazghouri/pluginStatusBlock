const webpack = require('webpack');
const  NODE_ENV = process.env.NODE_ENV || 'development';
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
var webpackConfig = {
    entry: './block.js',
    output: {
        path: __dirname,
        filename: './js/block.build.js',
    },
    watch: false,
    devtool: 'cheap-eval-source-map',
    module: {
        loaders: [
            {
                test: /.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract( "css-loader", "style-loader" )
            }
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
        }),new ExtractTextPlugin( {
            filename: './css/blocks.style.css',
        }),

    ]
};

if ('production' === NODE_ENV) {
    webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = webpackConfig;
