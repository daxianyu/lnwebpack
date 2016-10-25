require("shelljs/global"); //// 引入shell命令
var gulp = require("gulp");
var webpack = require("webpack");
var webpackDllConfig = require("./gulp/webpack.dll.js");
var webpackConfig = require("./gulp/webpack.config")();
var Setting = require("./gulp/directory");


gulp.task("dll", function (done) {
    webpack(webpackDllConfig, function () {
        done();
    })
});

gulp.task("webpack", function(done) {
    rm("-rf", Setting.statics);
    // cp("-r", './statics/css/', Setting.statics);
    // cp("-r", './statics/*', Setting.statics);
    // cp("-r", './statics/js/', Setting.statics);
    webpack(webpackConfig, function(){
        cp("-r", './statics/js/', Setting.statics);
        done();
    })
});

gulp.task("b", gulp.series("dll", "webpack")) ;

gulp.task("default", gulp.series("webpack"));

