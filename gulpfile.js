/**
 * Created by JackieWu on 12/11/15.
 */
const del = require('del');
const gulp = require('gulp');
const browserify = require('gulp-browserify');
const jade = require('gulp-jade');
const stylus = require('gulp-stylus');
const pureStylus = require('stylus');
const base64 = require('gulp-base64');
const jsUglify = require('gulp-uglify');
const minifyCss = require('gulp-minify-css');
const server = require('gulp-server-livereload');
const paths = {
    src: {
        stylus: 'stylus/**.styl',
        bigImage: 'images/**',
        jade: 'jade/*.jade',
        js: 'js/*.js'
    },
    build: {
        css: 'build/css/',
        bigImage: 'build/images/',
        html: 'build/',
        js: 'build/js/'
    },
    merge: {
        js: 'build/js/**',
        css: 'build/css/**',
        images: 'build/images/**',
        html: 'build/*.html'
    },
    release: {
        html: 'release/',
        js: 'release/js/',
        css: 'release/css/',
        images: 'release/images/'
    },
    cleanBuild: ['build'],
    cleanRelease: ['release']
};
//the test file
gulp.task('stylus', ['cleanBuild'], function () {
    return gulp.src(paths.src.stylus)
        .pipe(stylus({
            'resolve url': true,
            'define': {
                url: pureStylus.resolver()
            }
        }))
        .pipe(base64())
        .pipe(gulp.dest(paths.build.css));
});

gulp.task('jade', ['cleanBuild'], function () {
    return gulp.src(paths.src.jade)
        .pipe(jade({
            pretty: '    '
        }))
        .pipe(gulp.dest(paths.build.html));
});

gulp.task('js', ['cleanBuild'], function () {
    return gulp.src(paths.src.js)
        .pipe(browserify())
        .pipe(gulp.dest(paths.build.js))
});
gulp.task('img', ['cleanBuild'], function () {
    return gulp.src(paths.src.bigImage)
        .pipe(gulp.dest(paths.build.bigImage))
});

gulp.task('cleanBuild', function (cb) {
    return del(paths.cleanBuild, cb);
});

//online file
gulp.task('uglify', ['cleanRelease'], function () {
    return gulp.src(paths.merge.js)
        .pipe(jsUglify())
        .pipe(gulp.dest(paths.release.js))
});

gulp.task('minify', ['cleanRelease'], function () {
    return gulp.src(paths.merge.css)
        .pipe(minifyCss())
        .pipe(gulp.dest(paths.release.css))
});

gulp.task('cleanRelease', function (cb) {
    return del(paths.cleanRelease, cb);
});

gulp.task('image', ['cleanRelease'], function () {
    return gulp.src(paths.merge.images)
        .pipe(gulp.dest(paths.release.images))
});
gulp.task('rHtml', ['cleanRelease'], function () {
    return gulp.src(paths.merge.html)
        .pipe(gulp.dest(paths.release.html))
});

//server
gulp.task('server', function() {
    gulp.src(paths.build.html)
        .pipe(server({
            defaultFile: 'login.html'
        }));
});


gulp.task('default', ['build']);
gulp.task('build', ['jade', 'stylus', 'js', 'img']);
gulp.task('release', ['uglify', 'image', 'minify', 'rHtml']);