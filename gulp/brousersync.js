var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "dist"
        },
        notify: false, // Отключаю уведомления
        files: ['dist/*.html', 'dist/css/*.css', 'dist/js/*.js']
    });
});

// gulp.watch('dist/*.html', browserSync.reload);       // Наблюдение за HTML файлами в корне проекта
// gulp.watch('dist/js/*.js', browserSync.reload);      // Наблюдение за JS файлами в папке js
// gulp.watch('dist/css/*.css', browserSync.reload);    // Наблюдение за css файлами в папке css