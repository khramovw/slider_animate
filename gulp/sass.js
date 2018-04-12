var gulp         = require('gulp');
var sass         = require('gulp-sass');

var postcss      = require('gulp-postcss');
// var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');

gulp.task('sass', function () {
    return gulp.src('src/scss/**/*.{scss,sass}')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([ autoprefixer() ]))
        .pipe(gulp.dest('dist/css'));
});

gulp.watch('src/scss/**/*.scss', ['sass']);
