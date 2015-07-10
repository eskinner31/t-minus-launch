var routes = require('routes')(),
    fs = require('fs'),
    db = require('monk')('localhost/space'),
    users = db.get('users'),
    qs = require('qs'),
    view = require('./view'),
    mime = require('mime')

routes.addRoute('/home', (req, res, url) => {
  if (req.method === "GET") {
    res.setHeader('Content-Type', 'text/html')
    var templates = view.render('home', {})
    res.end(templates)
  }
  if (req.method === "POST") {
    var acum = ''
    req.on('data', function(chunk) {
      acum += chunk
    })
    req.on('end', function(){
      var data = qs.parse(acum)
      users.findOne({userName : data.userName}, function(err, doc) {
        if (err) {
          res.writeHead(302, {'Location' : '/register'})
          res.end()
          return
        }
        users.findOne({userPassword : data.userPassword}, function (err, doc) {
          if (err) {
            res.writeHead(302, {'Location' : '/register'})
            res.end()
            return
          } else if (data.member) {
            req.session.put('userName', ['data.userName', 'true'])
            res.writeHead(302, {'Location' : 'home/launch'})
            res.end()
          } else {
            req.session.put('userName', ['data.userName', 'false'])
            res.writeHead(302, {'Location' : 'home/weather'})
            res.end()
          }
        })
      })
    })
  }
})

routes.addRoute('/home/register', (req, res, url) => {
  if (req.method === "GET") {
    res.setHeader('Content-Type', 'text/html')
    var template = view.render('register')
    res.end(template)
  } else {
    var acum = ''
    req.on('data', function(chunk) {
      acum += chunk
    })
    req.on('end', function() {
      
    })
  }
})

routes.addRoute('/home/weather', (req, res, url) => {
  if (req.session.get('userName')) {
    var template = view.render('weather', {})
    res.end(template)
    return
  }
  res.writeHead(302, {'Location' : '/home/register'})
  res.end()
})

routes.addRoute('/home/launch', (req, res, url) => {
  if (req.session.get('userName') || req.session.get('true')) {
    var template = view.render('lunch', {})
    res.end(template)
    return
  }
  res.writeHead(302, {'Location' : '/home/register'})
  res.end()
})

routes.addRoute('/public/*', (req, res, url) => {
  res.setHeader('Content-Type', mime.lookup(req.url))
  fs.readFile('.' + req.url, function (err, file) {
    if (err) {
      res.setHeader('Content-Type', 'text/html')
      res.end('404')
    }
    res.end(file)
  })
})
module.exports = routes
