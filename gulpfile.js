var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync')

gulp.task('nodemon', function (cb) {
    var called = false;
    return nodemon({
                script: 'app.js',
                ext: 'js,jade',
                ignore: ['public/**'],
                env: {'NODE_ENV': 'development'}
    })
    .on('start', function onStart() {
        if(!called){cb();}
            called = true;
        })
    .on('restart', function() {
        setTimeout(function() {
          console.log('-------- restart --------');
          browserSync.reload({stream: false});
        }, 3000);
    });
});
// 监听变化
gulp.task('browser-sync', ['nodemon'], function(){
    browserSync.init({
        files: ['public/**','views/**'],
        proxy: 'http://localhost:3000',
        port: 4000,
        browser: ['/Applications/Google\ Chrome\ Canary.app/'],
        notify: true,
    });
});