var gulp = require('gulp');
var postcss = require('gulp-postcss');

gulp.task('css', function () {
    var processors = [
    ];
    return gulp.src('../public/components/*.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('../dest'));
   });