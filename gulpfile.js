///npm i gulp --save-dev
var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();

gulp.task('copyhtml', function() {
gulp.src('src/**/*.html').pipe(gulp.dest('build'));
  });

//npm install  gulp-sass --save-dev
gulp.task('sass', function () {
  return gulp.src('src/style/**/*.scss')
  .pipe(plumber())
  .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
  // .pipe(rename("styles.css"))
  .pipe(autoprefixer({
            browsers: ['last 42 versions'],
            cascade: false
        }))
  .pipe(gulp.dest('./build/style/')); });

//npm install --save-dev gulp-watch
gulp.task('watch', function () {
  gulp.watch("src/style/*.scss", ['sass']); });
//npm install browser-sync gulp --save-dev

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "build"
        }
    });
    
});

gulp.task('default', ['sass']);

gulp.task('w', ['watch', 'sass','browser-sync']);


