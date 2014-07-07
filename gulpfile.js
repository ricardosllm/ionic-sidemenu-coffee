var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var coffee = require('gulp-coffee');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var connect = require('gulp-connect');

var paths = {
  sass: ['source/scss/*.scss'],
  coffee: ['source/coffee/*.coffee'],
  css: ['www/**/*.css'],
  html: ['www/index.html', 'www/templates/**/*.html']
};

gulp.task('default', ['watch', 'server']);

gulp.task('sass', function(done) {
  // gulp.src('./source/scss/ionic.app.scss')
  gulp.src(paths.sass)
    .pipe(sass().on('error', function(e){ gutil.log(e); this.end(); }))
    .pipe(gulp.dest('./www/css/'))
    // .pipe(minifyCss({
    //   keepSpecialComments: 0
    // }))
    // .pipe(rename({ extname: '.min.css' }))
    // .pipe(gulp.dest('./www/css/'))
    .pipe(connect.reload())
    .on('end', done);
});

gulp.task('coffee', function(done) {
  gulp.src(paths.coffee)
    .pipe(coffee().on('error', function(e){ gutil.log(e); this.end(); }))
    .pipe(gulp.dest('./www/js/'))
    .pipe(connect.reload())
    .on('end', done);
});

gulp.task('css', function(done) {
  gulp.src(paths.css)
    .pipe(connect.reload())
    .on('end', done);
});

gulp.task('html', function(done) {
  gulp.src(paths.html)
    .pipe(connect.reload())
    .on('end', done);
});

gulp.task('watch', function() {
  // gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.coffee, ['coffee']);
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.html, ['html']);
});

gulp.task('server', function(){
  connect.server({
    root: ['www'],
    hostname: '0.0.0.0',
    port: 9100,
    livereload: true
  });
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
