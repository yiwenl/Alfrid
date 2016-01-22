'use strict';

// const gulp        = require('gulp');
import gulp         from 'gulp';
import babel        from 'gulp-babel';
import babelify     from 'babelify';
import browserify   from 'browserify';
import buffer       from 'vinyl-buffer';
import source       from 'vinyl-source-stream';
import sourcemaps   from 'gulp-sourcemaps';
import uglify       from 'gulp-uglify';
import jshint       from 'gulp-jshint';
import derequire    from 'gulp-derequire';
import watchify     from 'watchify';
import gutil        from 'gulp-util';


let logError = function(msg) {
    console.log('Error', msg.toString());   
}



let bundler = watchify(browserify({
    entries: 'src/alfrid.js',
    standalone: 'alfrid',
    debug: true
}, watchify.args));
bundler.transform(babelify);

let lint = function() {
    return gulp.src([
        'src/**/*.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));   
}


let bundle = function() {
    bundler.bundle()
        .on('error', function(err) {
            gutil.log('Browserify error:', err);
            this.emit('end');
        })
        .pipe(source('alfrid.js'))
        .pipe(buffer())
        .pipe(derequire())
        .pipe(sourcemaps.init({ loadMaps: true }))
        // .pipe(uglify()) // Use any gulp plugins you want now
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('build'))
        .pipe(gulp.dest('examples/test/dist/bundle'));
}

bundler.on('update', bundle);
bundler.on('log', gutil.log);



let release = function() {
    bundler.bundle()
        .on('error', logError)
        .pipe(source('alfrid.min.js'))
        .pipe(buffer())
        .pipe(derequire())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify()) // Use any gulp plugins you want now
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('build'));
}

//  Tasks

gulp.task('watch', function() {
    gulp.watch('src/**/*.js', ['jshint']);
});

gulp.task('jshint', lint);
gulp.task('lint', lint);
gulp.task('bundle', bundle);
gulp.task('release', release);
gulp.task('build', ['jshint', 'bundle', 'release']);
gulp.task('default', ['jshint', 'bundle']);
