import path from 'path'

const paths = {
  app: './app',
  dist: './dist'
}

module.exports = {
  entry: path.join(__dirname, paths.app, 'static/scripts/app.js'),

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, paths.app, 'static/scripts')
  },


  watch: true,

  module: {
    rules: [

      {test: /\.js$/, use: 'babel-loader'}

    ]
  }
}


export default paths;
