import webpack from 'webpack';
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

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
        new webpack.DefinePlugin(GLOBALS),
        new MiniCssExtractPlugin('styles.css')
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    compress: false,
                    ecma: 6,
                    mangle: true
                },
                sourceMap: true
            })
        ]
    },    
    module: {
        rules: [
            { test: /\.js$/, include: path.join(__dirname, 'src'), use: [{ loader: 'babel-loader' }]},
            { test: /(\.css)$/, use: [{ loader: MiniCssExtractPlugin.loader }]},
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: [{ loader: 'file-loader' }]},
            { test: /\.(woff|woff2)$/, use: [{ loader: 'url-loader', options: { prefix: 'font', limit: 5000} }]},
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: [{ loader: 'url-loader', options: { mimetype: 'application/octet-stream', limit: 10000} }]},
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: [{ loader: 'url-loader', options: { mimetype: 'image/svg+xml', limit: 10000} }]}
        ]
    }
};
