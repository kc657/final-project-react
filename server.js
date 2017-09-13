const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))

// to config API to use body body-parser and look for JSON in req.body
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
// to config API to use cookieParser
app.use(cookieParser())

// Prevent CORS errors
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers')

  // Remove caching
  res.setHeader('Cache-Control', 'no-cache')
  next()
})

// Setting Home Route
app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/public')
})

// Controller Routes
app.use('/', require('./controller/restapi/router'))

app.listen(port, function () {
  console.log(`App running on ${port}`)
})

/*
##May be needed later with cfenv package
const cfenv = require('cfenv')
const appEnv = cfenv.getAppEnv()
app.set('port',appEnv.port)
*/
