var gulp = require('gulp');
var runSequence = require('run-sequence');

// gulp.task('watch', ['sass', 'babel', 'browser-sync'], function () {
//
//     gulp.watch('src/scss/**/*.scss', ['sass']);
//     gulp.watch('src/js/*.js', ["babel"]);
//
// });

gulp.task('default', function () {

    runSequence(
        'sass',
        'babel',
        'browser-sync'
    );

});