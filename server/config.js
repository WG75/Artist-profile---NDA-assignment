const path = require('path');


const Env = !process.env.NODE_ENV ? 'app' : 'dist'


module.exports = {
  port: 8080,
  host: 'localhost',

  baseRoute: {
    connections: {
      routes: {
        files: {
          relativeTo: path.join(__dirname, `../${Env}/static`)
        }
      }
    }
  }
}
