var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    del = require('del');



// client
gulp.task('client', function() {
  return gulp.src('src/client/**')
    .pipe(gulp.dest('dist/client'))
});


// classes
gulp.task('classes', function() {
  return gulp.src('src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest('dist'))
});


// clean
gulp.task('clean', function() {
  return del(['dist',]);
});


// Default task
gulp.task('default', ['clean'], function() {
  gulp.start('client', 'classes');
});


