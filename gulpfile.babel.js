 import gulp from 'gulp'
import sass from 'gulp-sass'
import uglifyCss from 'gulp-uglifycss'
import plumber from 'gulp-plumber'
import browserSync from 'browser-sync'
import nodemon from 'gulp-nodemon'
import imagemin from 'gulp-imagemin'
import uglifycss from 'gulp-uglifycss'


const Env =  !process.env.NODE_ENV ? 'app' : 'dist'

const paths = {
  app: {
    css: './app/static/styles/style.sass',
    img: './app/static/images/*',
    views: './app/static/views/*'

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
  .pipe(uglifycss())
  .pipe(gulp.dest(`./${Env}/static/styles`))
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


gulp.task('imagemin', () => {
  gulp.src(paths.app.img)
  .pipe(imagemin([
    imagemin.jpegtran({
      progressive: true
    })
  ]))
  .pipe(gulp.dest(`./${Env}/static/images`))
})


gulp.task('ejs', () => {
  gulp.src(paths.app.views)
  .pipe(gulp.dest('./dist/static/views'))
  gulp.src('./app/static/artist.ejs')
  .pipe(gulp.dest('./dist/static/'))
})


gulp.task('build', ['sass', 'imagemin', 'ejs'])

gulp.task('start', ['sass', 'browsersync'])

gulp.watch('app/static/**/*.sass', ['sass'])

gulp.watch('app/**/*.+(ejs|js)', () => {
  setTimeout(browserSync.reload, 1000)
})
