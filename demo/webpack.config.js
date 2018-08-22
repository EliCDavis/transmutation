
const { CheckerPlugin, TsConfigPathsPlugin } = require('awesome-typescript-loader')
var webpack = require('webpack');
var LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {

    // Currently we need to add '.ts' to the resolve.extensions array.
    resolve: {
        extensions: ['.ts', '.js']
    },

    // Source maps support ('inline-source-map' also works)
    devtool: 'source-map',

    entry: {
        index: ['./demo/src/index.ts', 'webpack-hot-middleware/client?timeout=1000']
    },
    
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
        publicPath: '/'
    },

    // Add the loader for .ts files.
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            }
        ]
    },
    plugins: [
        new LiveReloadPlugin(),
        new TsConfigPathsPlugin({configFileName: 'demo/tsconfig.json'}),
        new CheckerPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
};