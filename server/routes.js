module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: (req, res) => {
      res.view('artist.ejs');
    }
  },

  {
    method: 'GET',
    path: '/styles/style.css',
    handler: (req, res) => {
      res.file('styles/style.css')
    }
  },

  {
    method: 'GET',
    path: '/scripts/bundle.js',
    handler: (req, res) => {
      res.file('scripts/bundle.js')
    }
  },

  {
    method: 'GET',
    path: '/images/{img}',
    handler: {
      directory: {
        path: 'images'
      }
    }
  }

]
