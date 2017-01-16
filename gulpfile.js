/* globals require, rm, cp, mkdir, JSON */
require('shelljs/global'); // 引入shell命令

const gulp = require('gulp'),
    fs = require('fs'),
    webpack = require('webpack'),
    merge = require('webpack-merge'),
    gulpRev = require('gulp-rev'),
    webpackStream = require('webpack-stream'),
    webpackDllConfig = require('./gulp/webpack.dll.js'),
    Setting = require('./gulp/directory'),
    connect = require('gulp-connect'),
    WebpackDevServer = require('webpack-dev-server'),
    gutil = require('gutil'),
    webpackConfig = require('./gulp/webpack.config'),
    raw = {
        jquery: Setting.nodeModules + '/jquery/dist/jquery.min.js',
        angular: Setting.nodeModules + '/angular/angular.min.js',
    },
    names = {},
    externals = {
        jquery: 'window.jquery',
        angular: 'window.angular',
    };

    /** 首先运行gulp b 运行第三方库文件打包以及项目构建
 *  如果第三方库没有变动,则直接运行gulp项目构建
 *  也可运行gulp dll 只对第三方库进行打包
 *  */

gulp.task('dll', function (done) {
    webpack(webpackDllConfig, function () {
        done();
    });
});

gulp.task('webpack', function (done) {                   // 使用原生 webpack 打包
    rm('-rf', Setting.statics);done();
    webpack(webpackConfig, function (err, stats) {
        cp('-r', './statics/js/', Setting.statics);
        if (err) {
            throw new gutil.PluginError('webpack', err);
        }
        gutil.log('[webpack]', stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false,
        }));
        done();
    });
});

gulp.task('copyModules', function (done) {
    rm('-rf', Setting.dest + '/*');
    mkdir('dist/modules');
    mkdir('dist/statics');
    let keyArr = Object.keys(raw),
        valueArr = [];
    keyArr.forEach(function (key) {
        valueArr.push(raw[key]);
    });
    done();
    return gulp.src(valueArr)
        .pipe(gulpRev())
        .pipe(gulp.dest(Setting.statics))
        .pipe(gulpRev.manifest('rev.json'))
        .pipe(gulp.dest(Setting.root));
});

gulp.task('ws', function (done) {
    let fileReg = /\/([^\/]+)$/,
        revMani = JSON.parse(fs.readFileSync(Setting.root + '/rev.json'));
    for (let item in raw) {
        if (raw[item]) {
            names[item] = '/statics/' + revMani[raw[item].match(fileReg)[1]];
        }
    }
    done();
    return gulp.src('./src/pages/**/index.js')
        .pipe(webpackStream(merge(webpackConfig, {
            watch: true,
            externals: externals,
            htmlTag: names,
        })))
        .pipe(gulp.dest(Setting.dest));                      // 最后的输出目录就在这里，其他一切以此为基
    // return webpackStream(webpackConfig);                 // 使用webpack stream进行打包,但是貌似没什么效果
});

gulp.task('server', function (done) {                    // 纯server服务
    done();
    return connect.server({
        port: 8888,
        root: './dist',
    });
});

gulp.task('webpack-dev-server', function () {        // 开发加服务器加监听
    new WebpackDevServer(webpack(webpackConfig), {}).listen(8889, 'localhost', function (err) {
        if (err) {
            throw new gutil.PluginError('webpack-dev-server', err);
        }
        // Server listening
        gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
    });
});

gulp.task('b', gulp.series('webpack', 'server'));
gulp.task('bs', gulp.series('copyModules', 'server', 'ws'));
gulp.task('default', gulp.series('webpack'));
