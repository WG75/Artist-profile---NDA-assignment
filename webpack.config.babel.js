import path from 'path'

const Env = !process.env.NODE_ENV ? 'app' : 'dist'


module.exports = {
  entry: path.join(__dirname, 'app/static/scripts/app.js'),

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, Env, 'static/scripts')
  },

  watch: true,

  module: {
    rules: [

      {test: /\.js$/, use: 'babel-loader'}

    ]
  }
}
