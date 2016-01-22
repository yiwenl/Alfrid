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


let logError = function(msg) {
    console.log('Error', msg.toString());   
}


let bundler = watchify(browserify({
    entries: 'src/alfrid.js',
    standalone: 'alfrid',
    debug: true
}, watchify.args));


let lint = function() {
    return gulp.src([
        'src/**/*.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));   
}


let bundle = function() {
    console.log('Bundle');
    bundler.transform(babelify);

    bundler.bundle()
        .on('error', logError)
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



let release = function() {
    bundler.transform(babelify);

    bundler.bundle()
        .on('error', logError)
        .pipe(source('alfrid.min.js'))
        .pipe(buffer())
        .pipe(derequire())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify()) // Use any gulp plugins you want now
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('build'))
        .pipe(gulp.dest('examples/test/dist/bundle'));
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
gulp.task('default', ['jshint', 'bundle', 'watch']);
