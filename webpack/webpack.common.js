const webpack = require("webpack");
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const srcDir = path.join(__dirname, '..', 'src');

module.exports = {
    entry: {
        background: path.join(srcDir, 'background.ts'),
        content_script: path.join(srcDir, 'content_script.ts')
    },
    output: {
        path: path.join(__dirname, '../dist/js'),
        filename: '[name].js'
    },
    optimization: {
        splitChunks: {
            name: 'vendor',
            chunks(chunk) {
                return chunk.name !== 'background';
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        fallback: {
            'crypto': require.resolve('crypto-browserify'),
            'buffer': require.resolve('buffer/'),
            'stream': require.resolve('stream-browserify'),
            'vm': require.resolve('vm-browserify'),
        },
        alias: {
            'process': 'process/browser',
        }
    },
    plugins: [
        // exclude locale files in moment
        new webpack.IgnorePlugin({
            resourceRegExp: /^\.\/locale$/,
            contextRegExp: /moment$/,
        }),
        new CopyPlugin({
            patterns: [
                { from: '.', to: '../', context: 'public' }
            ]
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ]
};
