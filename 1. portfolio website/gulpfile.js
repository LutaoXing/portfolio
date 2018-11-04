const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('my-scss',()=>{
    gulp.src('./scss/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('./css'));
});

gulp.task('scss-watcher',['my-scss'],()=>{
    gulp.watch('./scss/style.scss',['my-scss']);
    gulp.watch('./scss/partials/*.scss',['my-scss']);
});