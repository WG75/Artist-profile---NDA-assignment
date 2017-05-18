const path = require('path');


module.exports = {
  port: 8080,
  host: 'localhost',

  baseRoute: {
    connections: {
      routes: {
        files: {
          relativeTo: path.join(__dirname, `../dist/static`)
        }
      }
    }
  }
}
