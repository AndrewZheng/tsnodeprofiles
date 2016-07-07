var gulp = require('gulp');
var scss = require('gulp-scss');
var watch = require('gulp-watch');
var run = require('gulp-run');

gulp.task('scss', function () {
    gulp.src('public/styles/*.scss')
        .pipe(scss())
        .pipe(gulp.dest('public/styles/'));
});

gulp.task('tsc', function () {
    return run('tsc').exec();
});

gulp.task('default', ['scss', 'tsc']);

gulp.task('watch', ['scss', 'tsc'], function () {
    gulp.watch('public/styles/*.scss', ['scss']);
    gulp.watch('**/.ts', ['tsc']);
});