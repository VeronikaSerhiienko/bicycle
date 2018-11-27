var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();

gulp.task('copyhtml', function() {
  gulp.src('src/**/*.html').pipe(gulp.dest('build'));
});

gulp.task('sass', function () {
  return gulp.src('src/style/**/*.scss')
  .pipe(plumber())
  .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['> 1%', 'last 2 Chrome versions', 'Firefox ESR'],
    cascade: false
  }))
  .pipe(gulp.dest('./build/style/'));
});

gulp.task('watch', function () {
  gulp.watch("src/style/*.scss", ['sass']);
});

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "build"
    }
  });    
});

gulp.task('default', ['sass']);
gulp.task('w', ['watch', 'sass','browser-sync']);


