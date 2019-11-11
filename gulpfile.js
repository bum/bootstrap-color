var gulp = require('gulp'),
  sass = require('gulp-sass'),
  // sourcemaps = require('gulp-sourcemaps'),
  cleanCss = require('gulp-clean-css'),
  fs = require('fs'),
  path = require('path'),
  del = require('del'),
  copydir = require('copy-dir'),
  postcss = require('gulp-postcss'),
  rename = require('gulp-rename'),
  replace = require('gulp-replace'),
  autoprefixer = require('autoprefixer')

const DEST = 'dist/'
const DEST_FILE_BEGIN = '/_begin.scss'
const DEST_FILE_END = '/_end.scss'

const BOOTSWATCH = 'bootswatch'
const MACHINE = 'theme-machine'
const MACHINE_FILE_PREFIX = 'bootstrap4-'
const MACHINE_CSS = '/css'
let themeRoots = [BOOTSWATCH, MACHINE]
let buildPath = 'scss/build.scss'

function getFolders(dir) {
  return fs.readdirSync(dir).filter(function(file) {
    return fs.statSync(path.join(dir, file)).isDirectory()
  })
}

function checkCssDirToCopy(dir) {
  return fs.readdirSync(dir).length > 1
}

function buildCss(cb) {
  themeRoots.forEach(themeRoot => {
    let folders = getFolders(themeRoot)
    if (folders.length !== 0) {
      folders.forEach(function(folder) {
        let themeFolder = themeRoot + '/' + folder
        gulp
          .src(buildPath)
          .pipe(replace('themes/bubblegum', themeFolder))
          .pipe(sass().on('error', sass.logError))
          .pipe(postcss([autoprefixer({})]))
          .pipe(rename({ dirname: folder, basename: 'bs4-' + folder }))
          .pipe(gulp.dest(DEST))
          .pipe(cleanCss())
          .pipe(rename({ suffix: '.min' }))
          .pipe(gulp.dest(DEST))
          .on('end', () => {
            fs.copyFileSync(themeFolder + '/_variables.scss', DEST + folder + DEST_FILE_BEGIN)
            fs.copyFileSync(themeFolder + '/_bootswatch.scss', DEST + folder + DEST_FILE_END)
            // xử lý riêng với theme-machine có mixins
            if (themeRoot === MACHINE && checkCssDirToCopy(themeFolder + MACHINE_CSS)) {
              copydir.sync(themeFolder + MACHINE_CSS, DEST + folder + MACHINE_CSS, {
                filter: function(stat, file, dir) {
                  if (stat === 'file' && path.basename(file).startsWith(MACHINE_FILE_PREFIX)) {
                    return false
                  }
                  return true
                },
              })
            }
          })
      })
    }
  })
  fs.copyFileSync('scss/_common-utils.scss', DEST + '_common-utils.scss')

  cb()
}

function watcher(cb) {
  gulp.watch(['scss/*.scss', 'themes/**/css/*.scss'], gulp.series(buildCss))
}

function cleanDest() {
  return del([DEST])
}
function genDest() {
  return fs.promises.mkdir(DEST)
}

// Clean task
exports.cleanDest = cleanDest
exports.genDest = genDest
exports.buildCss = buildCss
exports.default = gulp.series(cleanDest, genDest, buildCss)
exports.watch = gulp.series(buildCss, watcher)
