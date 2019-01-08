var gulp = require('gulp');
var sass = require('gulp-sass');
const browsersync = require("browser-sync").create();
inlineCss = require('gulp-inline-css');

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./public/"
    },
    port: 3000
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  html();

  browsersync.reload();
  done();
}

function html(){
  return gulp.src('./*.html')
        .pipe(inlineCss())
        .pipe(gulp.dest('./output'));
}

// keeps gulp from crashing for scss errors
function scss(){
  return gulp.src('./sass/*.scss')
      .pipe(sass({ errLogToConsole: true, outputStyle: "expanded" }))
      .pipe(gulp.dest('./output/css'));
};

function build() {
  scss();
  html();
}

function watchfiles() {  
  gulp.watch('./sass/**/*.scss', scss);
  gulp.watch('./html/**/*', html);
}

const watch = gulp.parallel(watchfiles, browserSync);
exports.watch = watch;
exports.html = html;
exports.build = build;