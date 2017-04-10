import path from 'path'

const paths = {
  app: './app',
  dist: './dist'
}

module.exports = {
  entry: path.join(__dirname, paths.app, 'static/scripts/app.js'),

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, paths.dist, 'static/scripts')
  }
}
