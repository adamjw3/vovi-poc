const gulp = require('gulp');
const tingpng = require('gulp-tinypng');
const postcss = require('gulp-postcss');
const imagemin = require('gulp-imagemin');
const jshint = require('gulp-jshint');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const watch = require('gulp-watch');
const fileinclude = require('gulp-file-include');
const size = require('gulp-size');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const gcmq = require('gulp-group-css-media-queries');
const babel = require('gulp-babel');
const newer = require('gulp-newer');
const filter = require('gulp-filter');
const fs = require('fs-extra');
const path = require('path');
const es = require('event-stream');

const plugins = [autoprefixer({ browsers: ['last 3 version', 'Safari 8'] })];

function getFolders(dir) {
    return fs.readdirSync(dir).filter(function (file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
    });
}

gulp.task('images', function () {
    gulp.src('src/resources/images/**/*')
        .pipe(newer('dist/resources/images'))
        .pipe(imagemin())
        .pipe(gulp.dest('dist/resources/images'))
        .pipe(filter('**/*.png', { restore: true }))
        .pipe(tingpng('bL0oDgQc5kc58M6TeL3koOkKQFZGMd_6'))
        .pipe(gulp.dest('dist/resources/images'));
});

gulp.task('stylesheets', function (done) {
    return gulp
        .src('src/resources/sass/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gcmq())
        .pipe(postcss(plugins))
        .pipe(gulp.dest('dist/resources/css/'))
        .pipe(cleanCSS({ compatibility: 'ie10' }))
        .pipe(
            rename({
                suffix: '.min',
            })
        )
        .pipe(size({ title: 'css' }))
        .pipe(gulp.dest('dist/resources/css/'))
        .on('end', function () {
            browserSync.reload();
        });
    done();
});

gulp.task('html', function (done) {
    gulp.src(['src/*.html'])
        .pipe(fileinclude())
        .pipe(gulp.dest('dist'))
        .on('end', function () {
            browserSync.reload();
        });
    done();
});

gulp.task('javascript', function (done) {
    const folders = getFolders('src/resources/js/app/');

    var tasks = folders.map(function (folder) {
        return gulp
            .src(path.join('src/resources/js/app/', folder, '/*.js'))
            .pipe(concat(folder + '.js'))
            .pipe(babel())
            .pipe(gulp.dest('dist/resources/js/'))
            .pipe(uglify())
            .pipe(rename({ suffix: '.min' }))
            .pipe(size({ title: 'js' }))
            .pipe(gulp.dest('dist/resources/js/'))
            .on('end', function () {
                browserSync.reload();
            });
    });
    done();
    return es.concat.apply(null, tasks);
});

gulp.task('plugins', function () {
    return gulp
        .src('src/resources/js/plugins/*.js')
        .pipe(newer('dist/resources/js/plugins'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(size({ title: 'js' }))
        .pipe(gulp.dest('dist/resources/js/plugins'))
        .on('end', function () {
            browserSync.reload();
        });
});

gulp.task('default', function () {
    browserSync.init({
        server: {
            baseDir: './dist',
        },
    });

    gulp.watch('src/resources/images/**/*', gulp.series('images')).on('change', browserSync.reload);
    gulp.watch('src/resources/sass/**/*.scss', gulp.series('stylesheets')).on('change', browserSync.reload);
    gulp.watch('src/**/*.html', gulp.series('html')).on('change', browserSync.reload);
    gulp.watch('src/resources/js/app/**/*.js', gulp.series('javascript')).on('change', browserSync.reload);
    gulp.watch('src/resources/js/plugins/*.js', gulp.series('plugins')).on('change', browserSync.reload);
});
