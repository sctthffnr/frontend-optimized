var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');

gulp.task('minify-css', function() {
  gulp.src('src/css/*.css')
    .pipe(cleanCSS({}))
    .pipe(gulp.dest('dist/css'));
  gulp.src('src/views/css/*.css')
    .pipe(cleanCSS({}))
    .pipe(gulp.dest('dist/views/css'));
});
