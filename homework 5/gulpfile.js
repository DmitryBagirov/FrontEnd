var gulp = require('gulp');
var nunjucks = require('gulp-nunjucks');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();

var path = {
    css:  'src/styles/*.css',
    html: 'src/templates/*.html',
	images: 'src/images/*.*',
	fonts: 'src/fonts/*.*',
    dist: {
    	css:  'dist/styles/',
      	html: 'dist/',
		images: 'dist/images/',
	 	fonts: 'dist/fonts/'
    }
};

gulp.task('default', ['build', 'serve', 'watch']);

gulp.task('css', function () {
  return gulp.src(path.css)
    .pipe(concat('style.css'))
    .pipe(gulp.dest(path.dist.css));
});

gulp.task('fonts', function () {
  return gulp.src(path.fonts)
    .pipe(gulp.dest(path.dist.fonts));
});

gulp.task('images', function () {
  return gulp.src(path.images)
    .pipe(gulp.dest(path.dist.images));
});

gulp.task('html', function () {
  return gulp.src(path.html)
    .pipe(nunjucks.compile())
    .pipe(gulp.dest(path.dist.html));
});

gulp.task('build', ['html', 'css', 'images', 'fonts']);

gulp.task('watch', function () {
  	gulp.watch(path.css, ['css']);
  	gulp.watch(path.html, ['html']);
	gulp.watch(path.html, ['images']);
	gulp.watch(path.html, ['fonts']);
});

gulp.task('serve', ['watch'], function() {
  browserSync.init({
    server: {
      baseDir: path.dist.html
    }
  });
  gulp.watch('dist/**').on('change', browserSync.reload);
});