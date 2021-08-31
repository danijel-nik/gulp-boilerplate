'use strict';

const fs = require('fs');

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleancss  = require('gulp-minify-css');
const rename = require('gulp-rename');
const minify = require('gulp-minify');
const browserSync = require('browser-sync').create();

// task sass: compile scss into css
exports.sass = function() {
    // 1.where is my scss
    return gulp.src('src/assets/sass/**/*.scss') // gets all files ending with .scss in sass folder
        // 2. pass that file through sass compiler
        .pipe(sass({
            includePaths: ['node_modules']
        }).on('error', sass.logError))
        // 3. minify css
        .pipe(cleancss ({ level: 2 }))
        // 4. where do I save the compiled css file
        .pipe(gulp.dest('src/assets/css/'))
};

// compile js files
exports.js = function() {
    // 1.where is my js file
    return gulp.src('src/assets/js/*.js')
        // 2. rename js file - add suffix '.min'
        // .pipe(rename({suffix: `.min`}))
        // 3. minify js file
        .pipe(minify({
            noSource: true,
            ext: {
                min: ".min.js"
            }
        }))
        // 4. where do I save the compiled js file
        .pipe(gulp.dest('src/assets/js/dist/'))
};


// task default
exports.default = function() {

    browserSync.init({
        server: {
            baseDir: "src",
            index: "/index.html"
        }
    });

    gulp.watch('src/assets/js/*.js').on('change', gulp.series('js'));
    gulp.watch('src/assets/sass/**/*.scss', gulp.series('sass'));
    gulp.watch('src/*.html').on('change',browserSync.reload);
    gulp.watch('src/assets/css/*.css').on('change', browserSync.reload);
    gulp.watch('src/assets/js/*.js').on('change', browserSync.reload);
};
