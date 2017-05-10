'use strict';

var gulp  = require('gulp'),
    del = require('del'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    plugins  = require('gulp-load-plugins')(),
    browserSync = require('browser-sync').create();


// file cleanup
gulp.task('clean-css', function() {
  return del(['./dist/assets/css/*.css']);
});
gulp.task('clean-html', function() {
  return del(['./dist/*.html']);
});
gulp.task('clean-js', function() {
  return del(['./dist/assets/js/*.js']);
});
gulp.task('clean-img', function() {
  return del(['./dist/assets/img/*']);
});

// move and compile files
gulp.task('copy-css', ['clean-css'], function() {
  gulp.src('app/assets/css/*.css').pipe(gulp.dest('dist/assets/css'));
});
gulp.task('sass', ['clean-css', 'copy-css'], function () {
  return gulp.src(['./app/assets/css/*.scss'])
    .pipe(plugins.sourcemaps.init({loadMaps:true}))
    .pipe(plugins.sass({outputStyle: 'compressed'}).on('error', plugins.sass.logError))
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/assets/css'));
});
gulp.task('copy-html', ['clean-html'], function() {
  gulp.src('app/*.html').pipe(gulp.dest('dist'));
});
gulp.task('js', ['clean-js'], function (cb) {
  pump([
    gulp.src('./app/assets/js/*.js'),
    uglify(),
    gulp.dest('./dist/assets/js')
    ],
    cb
  );
});
gulp.task('copy-img', ['clean-img'], function() {
  gulp.src('app/assets/images/*').pipe(gulp.dest('dist/assets/images'));
});


// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch([
    './app/*.html'
  ], ['reload-html']);
  gulp.watch([
    './app/assets/js/*.js'
  ], ['reload-js']);
  gulp.watch([
    './app/assets/css/*.scss', 
    './app/assets/css/*.css'
  ], ['reload-css']);
  gulp.watch([
    './app/assets/img/*'
  ], ['reload-img']);
})


// Reload tasks
gulp.task('reload-html', ['copy-html'], function() {
  browserSync.reload();
});
gulp.task('reload-js', ['js'], function() {
  browserSync.reload();
});
gulp.task('reload-css', ['sass'], function() {
  browserSync.reload();
});
gulp.task('reload-img', ['copy-img'], function() {
  browserSync.reload();
});

// local server
gulp.task('server', function(){
  browserSync.init({
    server: {
      baseDir: './dist/',
      directory: true
    },
    browser: 'google chrome',
    open: false,
    notify: false
  });
});

gulp.task('default', [
  'copy-html',
  'sass',
  'js',
  'copy-img',
  'server',
  'watch'
]);