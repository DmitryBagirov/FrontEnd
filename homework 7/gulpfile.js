var gulp = require('gulp');
var nunjucks = require('gulp-nunjucks');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

var path = {
	js: 'src/javascript/*.js',
	mock: 'src/mock/*.json',
	partials: 'src/templates/partials/*.html',
    css:  'src/styles/*.css',
    html: 'src/templates/*.html',
	images: 'src/images/*.*',
	fonts: 'src/fonts/*.*',
    build: {
		js: 'build/javascript/',
		mock: 'build/mock/',
		partials: 'build/partials/',
    	css:  'build/styles/',
      	html: 'build/',
		images: 'build/images/',
		vendor: 'build/vendor/',
	 	fonts: 'build/fonts/'
    },
	vendor: {
		css: 'src/vendor/css/*.css'
	},
	prod: {
		js: 'prod/javascript/',
		mock: 'prod/mock/',
		partials: 'prod/partials/',
    	css:  'prod/styles/',
      	html: 'prod/',
		images: 'prod/images/',
		vendor: 'prod/vendor/',
	 	fonts: 'prod/fonts/'
    },
};

gulp.task('default', ['prod', 'build', 'serve', 'watch']);

gulp.task('css', function () {
  return gulp.src(path.css)
	.pipe(autoprefixer({
        browsers: ['last 4 versions']
    }))
    .pipe(concat('style.css'))
    .pipe(gulp.dest(path.build.css));
});

gulp.task('vendor-css', function () {
  return gulp.src(path.vendor.css)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest(path.build.vendor));
});

gulp.task('js', function () {
  return gulp.src(path.js)
    .pipe(gulp.dest(path.build.js));
});

gulp.task('partials', function () {
  return gulp.src(path.partials)
    .pipe(gulp.dest(path.build.partials));
});

gulp.task('mock', function () {
  return gulp.src(path.mock)
    .pipe(gulp.dest(path.build.mock));
});

gulp.task('fonts', function () {
  return gulp.src(path.fonts)
    .pipe(gulp.dest(path.build.fonts));
});

gulp.task('images', function () {
  return gulp.src(path.images)
    .pipe(gulp.dest(path.build.images));
});

gulp.task('html', function () {
  return gulp.src(path.html)
    .pipe(nunjucks.compile())
    .pipe(gulp.dest(path.build.html));
});
////////////////////////////
gulp.task('pjs', function () {
  return gulp.src(path.js)
    .pipe(gulp.dest(path.prod.js));
});

gulp.task('ppartials', function () {
  return gulp.src(path.partials)
    .pipe(gulp.dest(path.prod.partials));
});

gulp.task('pmock', function () {
  return gulp.src(path.mock)
    .pipe(gulp.dest(path.prod.mock));
});
gulp.task('vendor-css-min', function () {
  return gulp.src(path.vendor.css)
    .pipe(concat('vendor.css'))
    .pipe(cssmin())
    .pipe(gulp.dest(path.prod.vendor));
});

gulp.task('css-min', function () {
  return gulp.src(path.css)
    .pipe(autoprefixer({
        browsers: ['last 4 versions']
    }))
    .pipe(concat('style.css'))
    .pipe(cssmin())
    .pipe(gulp.dest(path.prod.css));
});

gulp.task('pfonts', function () {
  return gulp.src(path.fonts)
    .pipe(gulp.dest(path.prod.fonts));
});

gulp.task('pimages', function () {
  return gulp.src(path.images)
    .pipe(gulp.dest(path.prod.images));
});

gulp.task('phtml', function () {
  return gulp.src(path.html)
    .pipe(nunjucks.compile())
    .pipe(gulp.dest(path.prod.html));
});
/////////////////////////////
gulp.task('build', ['html', 'css', 'images', 'fonts', 'vendor-css', 'js', 'mock', 'partials']);
gulp.task('prod', ['phtml', 'css-min', 'vendor-css-min', 'pimages', 'pfonts', 'pjs', 'pmock', 'ppartials']);

gulp.task('watch', function () {
  	gulp.watch(path.css, ['css']);
  	gulp.watch(path.html, ['html']);
	gulp.watch(path.images, ['images']);
	gulp.watch(path.vendor.css, ['vendor-css']);
	gulp.watch(path.fonts, ['fonts']);
	gulp.watch(path.js, ['js']);
	gulp.watch(path.mock, ['mock']);
	gulp.watch(path.partials, ['partials']);
});

gulp.task('serve', ['watch'], function() {
  browserSync.init({
    server: {
      baseDir: path.build.html
    }
  });
  gulp.watch('build/**').on('change', browserSync.reload);
});