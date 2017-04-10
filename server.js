const hapi = require('hapi');

const server = new hapi.Server();

//set up port to listen on port 8080
server.connection({port: 8080, host: 'localhost'});


//run the server and log to the console and if there is an error throw it.
server.start(err => {
  if(err) throw err;

  console.log('yay! server is running on port 8080')
})


//register the inert plugin to render our static content
//and tell the server to respond with the jane.html
//file for any get requests for root.
server.register(require('inert'), (err) => {
  if(err) throw err;

  server.route({
    method: 'GET',
    path: '/',
    handler: (req, res) => {
      res.file('./app/static/artists/jane.html');
    }
  })
})
