const plugins = require('./plugins/plugins.js');
const config = require('./config.js');
const routes = require('./routes.js');
const hapi = require('hapi');
const ejs = require('ejs');


const server = new hapi.Server(config.baseRoute);

server.connection({
  port: config.port,
  host: config.host
})

server.start(err => {
  if(err) throw err;
  console.log('yay! server is running on port 8080')
})

server.register(plugins, (err) => {
  if(err) throw err;
})

server.views({
  engines: {ejs},
  relativeTo: __dirname,
  path: '../app/static/'
})


server.route(routes)
