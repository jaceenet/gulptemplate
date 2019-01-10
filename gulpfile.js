var gulp = require('gulp');
var gutil = require('gulp-util');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var browsersync = require("browser-sync").create();

inlineCss = require('gulp-inline-css');

const options = {
  wwwroot: './public/'
}

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: options.wwwroot
    },
    port: 3000
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

function html(){
  return gulp.src('./src/*.html')
        .pipe(gulp.dest(options.wwwroot));
}

// keeps gulp from crashing for scss errors
function scss(){
  return gulp.src('./src/*.scss')
      .pipe(sass({ errLogToConsole: true, outputStyle: "expanded" }))
      .on('error', gutil.log)
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
        }))
      
      .pipe(gulp.dest(options.wwwroot));
};

function scssWatched(done){
  scss();
  browserSyncReload(done);
}

function build() {
  scss();
  html();
}

function watchfiles() {  
  gulp.watch('./src/**/*.scss', scssWatched);
  gulp.watch('./src/**/*.html', html);
}

const watch = gulp.parallel(build, watchfiles, browserSync);
exports.watch = watch;
exports.html = html;
exports.build = build;
exports.scss = scss;