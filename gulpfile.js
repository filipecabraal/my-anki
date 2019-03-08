'use strict'; //declaração de variaveis de forma incorreta (sem o "var").

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('sass', function() {
    return gulp.src("*.scss")
        .pipe(sass())
        .pipe(gulp.dest("src"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['sass'], function() {
	browserSync.init({
		server: {
			baseDir: './'
		},
		open: false
	});

	gulp.watch("*.scss", ['sass']);
	gulp.watch(['./*.html', './**/*.html', './*.html'], ['refresh']);
});

gulp.task('refresh', function(){
	browserSync.reload();
});


