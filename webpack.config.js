const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

const isDev = process.env.NODE_ENV == 'development';

const PATHROOT = './assets/';

const notification = new WebpackNotifierPlugin({
    title: 'Sunflower Boilerplate',
    alwaysNotify: true,
    contentImage: path.join(__dirname, './assets/resources/images/sunflower.png')
});

const extractCSS = new MiniCssExtractPlugin({
    filename: "../css/[name].css",
    chunkFilename: "../css/[name].css"
});

const providePlugin = new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery"
});

const optimizeAssets = new OptimizeCSSAssetsPlugin({
    assetNameRegExp: /\.css$/,
    cssProcessor: require('cssnano'),
    cssProcessorPluginOptions: {
      preset: ['default', { discardComments: { removeAll: true } }],
    },
    canPrint: true
});

const minifyJS = new UglifyJsPlugin();

const getPlugins = () => {

    let plugins = [];

    plugins.push(notification);
    plugins.push(extractCSS);
    plugins.push(providePlugin);
    plugins.push(optimizeAssets);  
    plugins.push(minifyJS);

    return plugins;
}

const config = {
    mode: "development",
    entry: {
        app: ['./src/js/app.js', './src/scss/app.scss']
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "./assets/js/")
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [ 
                    MiniCssExtractPlugin.loader,
                    "css-loader", 
                    "sass-loader"
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '../fonts/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '../images/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: [".js", ".css", ".ts", ".scss"]
    },
    plugins: getPlugins()
}

module.exports = config;