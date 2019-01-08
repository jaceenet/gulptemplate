var gulp = require('gulp');
var sass = require('gulp-sass');
const browsersync = require("browser-sync").create();

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
  browsersync.reload();
  done();
}

// keeps gulp from crashing for scss errors
function scss(){
  return gulp.src('./sass/*.scss')
      .pipe(sass({ errLogToConsole: true, outputStyle: "expanded" }))
      .pipe(gulp.dest('./public/css'));
};

function watchfiles() {  
  gulp.watch('./sass/**/*.scss', scss);
  gulp.watch('./public/**/*', browserSyncReload);
}

const watch = gulp.parallel(watchfiles, browserSync);
exports.watch = watch;