const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        publicPath: './',
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
    },
    performance: {
        maxAssetSize: 500000,
        maxEntrypointSize: 500000,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'public/*.php', to: '[name][ext]' },
                { from: 'public/*.js', to: '[name][ext]' },
                { from: 'public/favicon.ico', to: 'favicon.ico' },
                { from: 'public/assets', to: 'assets' },
                { from: 'public/.htaccess', to: './.htaccess', toType: 'file' },
            ],
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            // {
            //     test: /\.css$/,
            //     use: ['style-loader', 'css-loader'],
            // },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/images/[name][ext]', // Pfade und Namen der Bild-Assets
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][ext]', // Pfade und Namen der Schrift-Assets
                }
            },
            {
                test: /\.(css)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[name][ext][query]', // Pfade und Namen der CSS-Assets
                }
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
};
