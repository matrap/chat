import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('production')
};

export default {
    mode: 'production',
    devtool: 'source-map',
    entry: './src/index',
    target: 'web',
    output: {
        path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin(GLOBALS),
        new ExtractTextPlugin('styles.css'),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ],
    module: {
        loaders: [
            { test: /\.js$/, include: path.join(__dirname, 'src'), use: [{ loader: 'babel-loader' }]},
            { test: /(\.css)$/, use: [{ loader: ExtractTextPlugin.extract("css?sourceMap") }]},
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: [{ loader: 'file-loader' }]},
            { test: /\.(woff|woff2)$/, use: [{ loader: 'url-loader', options: { prefix: 'font', limit: 5000} }]},
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: [{ loader: 'url-loader', options: { mimetype: 'application/octet-stream', limit: 10000} }]},
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: [{ loader: 'url-loader', options: { mimetype: 'image/svg+xml', limit: 10000} }]}
        ]
    }
};
