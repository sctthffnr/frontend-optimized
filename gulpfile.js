var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var htmlMin = require('gulp-htmlmin');
var imageResize = require('gulp-image-resize');

gulp.task('minify-css', function() {
  gulp.src('src/css/*.css')
    .pipe(cleanCSS({}))
    .pipe(gulp.dest('dist/css'));
  gulp.src('src/views/css/*.css')
    .pipe(cleanCSS({}))
    .pipe(gulp.dest('dist/views/css'));
});

gulp.task('minify-html', function() {
  gulp.src('src/*.html')
    .pipe(htmlMin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/'));
});

gulp.task('resize-image', function() {
  gulp.src('src/views/images/pizzeria.jpg')
    .pipe(imageResize({
      width: 256,
      height: 192
    }))
    .pipe(gulp.dest('dist/views/images/'));
});
