/* globals require, module */
const path = require('path'),
    webpack = require('webpack'),
    Setting = require('./directory');

function getAlias () {
    return {
        'jquery': path.resolve(Setting.nodeModules, 'jquery/dist/jquery.min.js'),
        'angular': path.resolve(Setting.nodeModules, 'angular/angular.min.js'),
    };
}

module.exports = {
    resolve: {
        alias: getAlias(),
    },
    entry: {
        vendors: ['jquery', 'angular'],
    },
    output: {
        path: Setting.root + '/statics',
        filename: '/js/[name].js',
        library: 'vendor',
    },
    plugins: [
        new webpack.DllPlugin({
            path: 'manifest.json',
            name: 'vendor',
            context: Setting.root,
        }),
    ],
};
