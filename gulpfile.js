const { src, dest, task, series, watch, parallel } = require('gulp');
const rm = require('gulp-rm');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-smile-px2rem');
const cleanCSS = require('gulp-clean-css');
const gcmq = require('gulp-group-css-media-queries');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');

const {SRC_PATH, DIST_PATH, STYLES_LIBS, JS_LIBS} = require('./gulp.config.js');

sass.compiler = require('node-sass');

task("icons", () => {
  return src(`${SRC_PATH}/img/icons/*.svg`)
    .pipe(
      svgo({
      plugins: [
        {
          removeAttrs: {
          attrs: "(fill|stroke|style|width|height|data.*)"
        }
      }
    ]
      }))
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: `${SRC_PATH}/img/sprite.svg`
        }
      }
    }))
  .pipe(dest(`${DIST_PATH}/img/icons`))
});

task("clean", () => {
  return src(`${DIST_PATH}/**/*`, { read: false }).pipe(rm())
});

task("copy:html", () => {
  return src(`${SRC_PATH}/*.html`)
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
});

task('copy-img', () => {
  return src(`${SRC_PATH}/img/**/*`).pipe(dest(`${DIST_PATH}/img`));
});

task('copy-fonts', () => {
  return src(`${SRC_PATH}/css/fonts/**/*`).pipe(dest(`${DIST_PATH}/fonts`));
});

task("styles", () => {
  return src([...STYLES_LIBS, `${SRC_PATH}/css/main.scss`,
])
    .pipe(sourcemaps.init())//инициализируем сорсмапы
    .pipe(concat("main.min.scss"))//склейка стилей
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))//sass
    .pipe(px2rem({
  dpr: 1,             // base device pixel ratio (default: 2)
  rem: 16,            // root element (html) font-size (default: 16)
  one: false          // whether convert 1px to rem (default: false)
}))//пиксели в rem
    .pipe(autoprefixer())
    .pipe(gcmq())//медиа запросы gulp media group
    .pipe(cleanCSS())//минификация gulp clean css
    .pipe(sourcemaps.write())//записываем сорсмапы
    .pipe(dest(DIST_PATH))//папка назначения
    .pipe(reload({stream: true}));
});

task('scripts', () => {
  return src([
    ...JS_LIBS, `${SRC_PATH}/js/*.js`
  ])
    .pipe(sourcemaps.init())//инициализируем сорсмапы
    .pipe(concat("main.min.js", { newline: ";" }))//склейка скриптов
    .pipe(babel({//подключаем babel
      presets: ['@babel/env']
    }))
    // .pipe(uglify())
    // .pipe(sourcemaps.write())//записываем сорсмапы
    .pipe(dest(DIST_PATH))//папка назначения
    .pipe(reload({stream: true}));
});

task('server', () => {
    browserSync.init({
        server: {
            baseDir: DIST_PATH
      },
      open: false
    });
});

watch(`${SRC_PATH}/styles/**/*.scss`, series('styles'));
watch(`${SRC_PATH}/*.html`, series('copy:html'));
watch('./scripts/*.js', series('scripts'));
watch(`${DIST_PATH}/img/icons/*.svg`, series('icons'));


task("default", series("clean", parallel("copy-img", "copy-fonts", "copy:html", "icons", "styles", "scripts"), "server"));
