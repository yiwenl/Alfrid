/*eslint-env node*/
'use strict';

var argv         = require('yargs').argv,
  gulp         = require('gulp'),
  browserSync  = require('browser-sync').create(),
  babelify     = require('babelify'),
  concat       = require('gulp-concat'),
  eslint       = require('gulp-eslint'),
  exit         = require('gulp-exit'),
  clean        = require('gulp-clean'),
  sourcemaps   = require('gulp-sourcemaps'),
  postcss      = require('gulp-postcss'),
  browserify   = require('browserify'),
  source       = require('vinyl-source-stream'),
  buffer       = require('vinyl-buffer'),
  notify       = require("gulp-notify"),
  url          = require('url'),
  fs          = require('fs');

var config = {
  paths: {
    defaultFile : 'index.html',
    html        : 'src/*.html',
    shaders     : 'src/js/**/*.{frag,vert}',
    js          : 'src/js/app/**/*.js',
    jsLibs      : 'src/js/libs/**/*.js',
    images      : 'src/images/**/*.{png,jpg,jpeg}',
    fonts       : 'src/fonts/**/*',
    json        : 'src/json/**/*.json',
    styl        : 'src/styles/**/*.css',
    mainJs      : 'src/js/app/main.js',
    dist        : 'dist',
    dev         : 'dev',
    app         : 'src'
  }
};


var production = (argv.env === 'production') ? true : false;
var dir = (production) ? config.paths.dist : config.paths.dev;


gulp.task('style', function() {
  var bem = require('postcss-bem')({
    // defaultNamespace: 'w12', // default namespace to use, none by default
    // style: 'suit' // suit or bem, suit by default,
    // separators: {
    //   descendent: '__' // overwrite any default separator for chosen style
    // },
    // shortcuts: {
    //   utility: 'util' //override at-rule name
    // }
  });
  var processors = [
    require('postcss-import'),      // Inline css import
    bem,
    require('postcss-nested'),
    require('postcss-simple-vars'),  // Simple variables,
    require("postcss-color-function"), // Color stuff
    require('lost'),                // Grid system
    require('postcss-pxtorem')({
      prop_white_list: []
    }),     // Pixel values to rem
    require('autoprefixer')(['last 3 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'])    // Auto vendor prefix
  ];
  return gulp.src(config.paths.styl)
      .pipe(sourcemaps.init())
      .pipe(postcss(processors))
      // .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(dir+'/css'))
      .pipe(browserSync.reload({stream:true}))
      .pipe(notify('Style Processed!'));
});

gulp.task('lint', function() {
  return gulp.src(config.paths.js)
    .pipe( eslint() )
    .pipe(eslint.formatEach());
});

gulp.task('js', function() {
  console.log('js');
  browserify(config.paths.mainJs)
    .transform(babelify)
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(dir + '/js'))
    .pipe( browserSync.reload({stream:true}) )
    .pipe(notify("Javascript Compiled!"));
});

gulp.task('jsLibs', function() {
  gulp.src(config.paths.jsLibs)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(dir+'/js'))
    .pipe( browserSync.reload({stream:true}) );
});

gulp.task('html', function() {
  gulp.src(config.paths.html)
    .pipe(gulp.dest(dir))
    .pipe( browserSync.reload({stream:true}) );
});

gulp.task('json', function() {
  gulp.src(config.paths.json)
    .pipe(gulp.dest(dir+'/json'))
    .pipe( browserSync.reload({stream:true}) );
});

gulp.task('images', function() {
  gulp.src(config.paths.images)
    .pipe(gulp.dest(dir+'/images'))
    .pipe( browserSync.reload({stream:true}) );
});

gulp.task('fonts', function() {
  gulp.src(config.paths.fonts)
    .pipe(gulp.dest(dir+'/fonts'))
    .pipe( browserSync.reload({stream:true}) );
});

gulp.task('serve', function() {

  browserSync.init({
    server: {
      baseDir: dir
    },
    middleware: function(req, res, next) {
      var fileName = url.parse(req.url);
      fileName = fileName.href.split(fileName.search).join('');
      var fileExists = fs.existsSync(dir + fileName);
      if (!fileExists && fileName.indexOf('browser-sync-client') < 0) {
        req.url = '/' + config.paths.defaultFile;
      }
      return next();
    },
    ghostMode: {
      scroll: true
    },
    notify: true
  });

});

gulp.task('watch', function() {
  gulp.watch(config.paths.styl, ['style']);
  gulp.watch(config.paths.js, ['js', 'lint']);
  gulp.watch(config.paths.jsLibs, ['jsLibs']);
  gulp.watch(config.paths.json, ['json']);
  gulp.watch(config.paths.fonts, ['fonts']);
  gulp.watch(config.paths.images, ['images']);
  gulp.watch(config.paths.html, ['html']).on('change', browserSync.reload);
});

gulp.task('clean', function(path) {
  return gulp.src( dir ).pipe( clean() );
});

if(production) {
  console.log("need to setup the production version");
} else {
  gulp.task('default', ['json','images','fonts','style','js','jsLibs','html','serve', 'watch']);
}
