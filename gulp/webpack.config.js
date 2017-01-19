/**
 * Created by tangjianfeng on 2016/10/23.
 */
/* global require, module, process */

const _ = require('lodash'),
    path = require('path'),
    webpack = require('webpack'),
    glob = require('glob'),
    entries = getEntry('./src/pages/**/index.js'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    WebpackMd5Hash = require('webpack-md5-hash'),
    Setting = require('./directory');

// require('file-loader')

function getEntry (globpath) {
    let entries = {}, pathname;
    glob.sync(globpath).forEach(function (entry) {
        pathname = entry.split('/').splice(-2, 1);
        entries[pathname] = entry;
    });
    return entries;
}

function isProd () {
    // export NODE_ENV=test  直接在终端中键入
    return process.env.NODE_ENV === 'product';
}

function getLoaders () {
    return [{
        test: /\.ts$/,
        // loader: ExtractTextPlugin.extract('ts')
        // loader: ExtractTextPlugin.extract('awesome-typescript-loader')
        loaders: ['awesome-typescript-loader'],
    }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css'),
    }, {
        test: /\.(png|jpg)$/,
        loader: 'url',
        query: {
            limit: 8196,
            name: 'statics/images/[name]_[hash:6].[ext]',
        },
    }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass'),
    }, {
        test: /[^(index)]\.html$/,
        loader: 'html',
    }, {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
            presets: ['es2015'],
        },
    }];
}

function getPlugin () {
    let defaultPlugin = [
            // new webpack.ProvidePlugin({
            //     '$': 'jquery.js',
            //     'jquery': 'jquery.js',
            //     'jQuery': 'jquery.js'
            // }),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
                },
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common',
                filename: 'statics/js/common_[chunkhash:6].js',
                minChunks: 2,
            }),
            new ScriptExtHtmlWebpackPlugin({
                defaultAttribute: 'defer',
            }),
            new ExtractTextPlugin('statics/css/[name]_[contenthash:6].css'),
            new WebpackMd5Hash(),
            // new webpack.DllReferencePlugin({
            //     context: Setting.root,
            //     manifest: require(Setting.root + '/manifest.json'),
            //     name: 'vendor',
            // }),
        ],
        pages = getEntry('./src/pages/**/index.html');
    if (isProd()) {
        defaultPlugin.push(
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                },
            })
        );
    }
    _.each(pages, function (value, key, object) {
        let conf = {
            template: path.resolve(Setting.root, value),
            filename: `modules/${key}.html`,
            inject: 'body',
            chunks: [key, 'common'],
            excludeChunks: [],
        };
        defaultPlugin.push(new HtmlWebpackPlugin(conf));
    });
    return _.union(defaultPlugin, []);
}

function getPostCss () {
    return '';
}

module.exports = {
    // context: __dirname,
    entry: entries, // webpack在二级目录下,说明调用的时候是以gulpfile所在目录为基准
    watch: true,
    cache: true,
    profile: true,
    output: {
        path: Setting.dest,
        publicPath: '/',                                // 即以path为基
        filename: 'statics/js/[name]_[chunkhash:6].js',      // 不能'/'打头，分隔符写到path中
        chunkFilename: 'statics/js/chunk_[name].js',
    },
    devtool: 'eval-source-map',
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint',
                include: Setting.root,
                exclude: /[node_modules | src\/js\/common]/,
            },
        ],
        loaders: getLoaders(),
    },
    eslint: {
        configFile: Setting.root + '/.eslintrc.js', // 指定eslint的配置文件
        failOnWarning: true,                       // 报warning终止webpack
        failOnError: true,                          // 报error终止
        cache: true,                                // 开启eslint的cache，cache存在node_modules/.cache目录里
    },
    resolve: {
        extensions: ['', '.ts', '.js'],
    },
    plugins: getPlugin(),
    postcss: getPostCss(),
};
