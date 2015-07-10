var routes = require('routes')(),
    fs = require('fs'),
    db = require('monk')('localhost/space'),
    users = db.get('users'),
    qs = require('qs'),
    view = require('./view'),
    mime = require('mime')




module.exports = routes
