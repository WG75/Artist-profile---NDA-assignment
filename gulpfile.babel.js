import gulp from 'gulp'
import sass from 'gulp-sass'
import uglifyCss from 'gulp-uglifycss'
import plumber from 'gulp-plumber'
import browserSync from 'browser-sync'
import nodemon from 'gulp-nodemon'


const paths = {
  app: {
    css: './app/static/styles/style.sass',
    img: './app/static/images/*'
  },

  dist: {
    css: './dist/static/styles',
    img: './dist/static/images'
  }
}

gulp.task('sass', () => {
  gulp.src(paths.app.css)
  .pipe(plumber())
  .pipe(sass({
    errLogToConsole: true
  }))
  .pipe(gulp.dest('./app/static/styles'))
  .pipe(browserSync.stream())
})


gulp.task('browsersync', ['nodemon'], () => {
  browserSync.init({
    proxy: 'localhost:8080'
  })
})

gulp.task('nodemon', () => {
  nodemon({
    script: 'server.js',
    ext: 'ejs js'
  })
})


gulp.task('start', ['sass', 'browsersync'])

gulp.watch('app/static/**/*.sass', ['sass'])

gulp.watch('app/**/*.+(ejs|js)', () => {
  setTimeout(browserSync.reload, 1000)
})
