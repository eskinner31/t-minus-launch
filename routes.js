var routes = require('routes')(),
    fs = require('fs'),
    db = require('monk')('localhost/space'),
    users = db.get('users'),
    qs = require('qs'),
    view = require('./view'),
    mime = require('mime')

routes.addRoute('/home', (req, res, url) => {
  if (req.method === 'GET') {
    res.setHeader('Content-Type', 'text/html')
    var templates = view.render('home', {})
    res.end(templates)
  }
  if (req.method === 'POST') {
    var acum = ''
    req.on('data', function(chunk) {
      acum += chunk
    })
    req.on('end', function(){
      var data = qs.parse(acum)
      users.findOne({userName : data.userName}, function(err, doc) {
        if (err) {
          res.writeHead(302, {'Location' : '/home/register'})
          res.end()
          return
        }
        users.findOne({userPassword : data.userPassword}, function (err, doc) {
          if (err) {
            res.writeHead(302, {'Location' : '/home/register'})
            res.end()
            return
          } else if (doc.member) {
            req.session.put('userName', [doc.userName, true])
            res.writeHead(302, {'Location' : 'home/launch'})
            res.end()
          } else {
            req.session.put('userName', [doc.userName, false])
            res.writeHead(302, {'Location' : 'home/weather'})
            res.end()
          }
        })
      })
    })
  }
})

routes.addRoute('/home/register', (req, res, url) => {
  if (req.method === 'GET') {
    res.setHeader('Content-Type', 'text/html')
    var template = view.render('sessions/register', {})
    res.end(template)
  }
  if (req.method==='POST'){
    var acum = ''
    req.on('data', function(chunk) {
      acum += chunk
    })
    req.on('end', function() {
      var data = qs.parse(acum)
      console.log(data)
      if (data.member === 'true'){
        data.member = true
      } else {data.member = false}
      users.insert(data, function(err, doc) {
        if (err) res.end('something is wrong')
        console.log(doc.member)
        if (doc.member){
          console.log('hello')
          req.session.put('userName', [doc.userName, true])
          res.writeHead(302, {'Location' : '/home/launch'})
          res.end()
        } else {
          req.session.put('userName', [doc.userName, false])
          res.writeHead(302, {'Location' : '/home/weather'})
          res.end()
        }
      })
    })
  }
})

routes.addRoute('/home/logout', (req, res, url) => {
  req.session.flush()
  res.writeHead(302, {'Location': '/home'})
  res.end()
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
  console.log(req.session.get('userName'))
  if (req.session.get(userName[0]) && req.session.get(userName[1])) {
    var template = view.render('launch', {})
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
