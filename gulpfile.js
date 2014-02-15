var gulp = require('gulp'),
    gutil = require('gulp-util');

var jshint = require('gulp-jshint'),
    mochaTask = require('gulp-mocha'),
    through2 = require('through2'),
    cover = require('gulp-coverage'),
    clean = require('gulp-clean');

function synchro(done) {
    return through2.obj(function (data, enc, cb) {
            cb();
        },
        function (cb) {
            cb();
            done();
        });
}

gulp.task('clean', function () {
    gulp.src(['temp/**/*.js', 'temp/**/*.html', ".coverrun/**/**"], {read: false})
        .pipe(clean());
});

gulp.task("jshint", function () {
    gulp.src(["index.js", "src/**/*.js", "test/**/*.js", ".coverdata"])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter())
});

gulp.task("unit-test", function (done) {
    gulp.src(["test/**/*.js"])
        .pipe(cover.instrument({
            pattern: ['src/**/*.js', "index.js"],
            debugDirectory: 'temp/debug'
        }))
        .pipe(mochaTask({
            reporter: 'spec'
        }))
        .pipe(cover.gather())
        .pipe(cover.format({
            outFile: 'temp/blnkt.html'
        }))
        .pipe(gulp.dest('temp/output'))
        .pipe(synchro(done));
});

gulp.task('default', ["clean", "jshint", "unit-test"], function () {
    // place code for your default task here
});