const browserify = require("browserify");
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const babel = require('gulp-babel');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');

gulp.task('browser-bundle-min', function() {
  return browserify('./src/browser-bundle.js')
    .transform('babelify', {presets: ['es2015', 'react']})
    // .external(['react'])
    .bundle()
    .pipe(source('slider-routes-browser.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

// gulp.task('module-bundle-min', function() {
//   return browserify('./src/slider-routes.js', {standalone: 'sliderRoutes'})
//     .transform('babelify', {presets: ['es2015', 'react']})
//     // .external(['react'])
//     .bundle()
//     .pipe(source('slider-routes.min.js'))
//     .pipe(buffer())
//     .pipe(uglify())
//     .pipe(gulp.dest('./dist'));
// });

gulp.task('default', [
  'browser-bundle-min',
  // 'module-bundle-min'
]);