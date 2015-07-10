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
            req.session.put('userName', 'data.userName')
            res.writeHead(302, {'Location' : 'home/launch'})
            res.end()
          } else {
            req.session.put('userName', 'data.userName')
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
  }
})
module.exports = routes
