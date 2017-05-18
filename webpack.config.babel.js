import path from 'path'


module.exports = {
  entry: path.join(__dirname, 'app/static/scripts/app.js'),

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist/static/scripts')
  },

  watch: true,

  module: {
    rules: [

      {test: /\.js$/, use: 'babel-loader'}

    ]
  }
}
