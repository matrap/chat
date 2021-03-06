import webpack from 'webpack';
import path from 'path';

export default {
    mode: 'development',    
    devtool: 'inline-source-map',
    entry: [
        'eventsource-polyfill', // necessary for hot reloading with IE
        'webpack-hot-middleware/client?reload=true', //note that it reloads the page if hot module reloading fails.
        path.resolve(__dirname, 'src/index')
    ],
    target: 'web',
    output: {
        path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'src')
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
    module: {
        rules: [
            { test: /\.js$/, include: path.join(__dirname, 'src'), use: [{ loader: 'babel-loader' }]},
            { test: /(\.css)$/, use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]},
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: [{ loader: 'file-loader' }]},
            { test: /\.(woff|woff2)$/, use: [{ loader: 'url-loader', options: { prefix: 'font', limit: 5000} }]},
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: [{ loader: 'url-loader', options: { mimetype: 'application/octet-stream', limit: 10000} }]},
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: [{ loader: 'url-loader', options: { mimetype: 'image/svg+xml', limit: 10000} }]}
        ]
    }
};
