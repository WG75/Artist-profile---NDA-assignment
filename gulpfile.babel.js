import gulp from 'gulp'

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

gulp.task('test', () => {
  console.log(paths);
})
