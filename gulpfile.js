var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var htmlMin = require('gulp-htmlmin');
var imageResize = require('gulp-image-resize');
var imageMin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var inlineCSS = require('gulp-inline-css');
var deleteLines = require('gulp-delete-lines');

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
  gulp.src('src/views/*.html')
      .pipe(htmlMin({collapseWhitespace: true}))
      .pipe(gulp.dest('dist/views'));
});

gulp.task('resize-and-compress', function() {
  gulp.src('src/views/images/pizzeria.jpg')
    .pipe(imageResize({
      width: 128,
      height: 96
    }))
    .pipe(imageMin({progressive: true}))
    .pipe(gulp.dest('dist/views/images/'));
  gulp.src('src/img/*')
    .pipe(imageMin({}))
    .pipe(gulp.dest('dist/img'));
  gulp.src('src/views/images/pizza.png')
    .pipe(imageMin({})
    .pipe(gulp.dest('dist/views/images/')));
});

gulp.task('uglify-js', function() {
  gulp.src('src/js/*')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
  gulp.src('src//views/js/*')
    .pipe(uglify())
    .pipe(gulp.dest('dist/views/js'));
});

gulp.task('inline-css', function() {
  gulp.src('src/*.html')
    .pipe(inlineCSS({removeLinkTags: false}))
    .pipe(deleteLines({
      'filters' : [
        /style\.css/i
      ]
    }))
    .pipe(deleteLines({
      'filters' : [
        /google-fonts\.css/i
      ]
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['minify-css', 'minify-html', 'resize-and-compress',
           'uglify-js', 'inline-css']);
