const gulp = require('gulp');
const terser = require('gulp-terser');
const rename = require('gulp-rename');
const transform = require('gulp-transform');
const beautify = require('gulp-beautify');


const buildMsgJs = "This js file has been minified by Terser, please do not directly modify this file to change features, use the files ending in _src instead to recompile the final bundle, or use them directly instead"
const srcMsgText = "Incase the build process for this theme is lost, use this src file to recreate a build process"

const buildJs = () => {
  return  gulp.src('src/js/*.js')
      .pipe(terser({
        keep_fnames: false,
        mangle: true
      }))
      .pipe(rename({ extname: '.min.js' }))
      .pipe(transform('utf8', compileMsg))
      .pipe(gulp.dest('assets'))
};

const buildJsSource = () => {
  return  gulp.src('src/js/*.js')
     .pipe(beautify.js({ indent_size: 2 }))
      .pipe(rename({  suffix: '_src' }))
      .pipe(transform('utf8', srcMsg))
      .pipe(gulp.dest('assets'))
};

gulp.task('watch', function () {
  gulp.watch('src/js/*.js', buildJs);
  gulp.watch('src/js/*.js', buildJsSource);
});


function compileMsg(content, file) {
      return `// ${buildMsgJs}\n\n${content}`;
}

function srcMsg(content, file ) {
    return `/* ${srcMsgText} */ \n${content}\n`;
  }