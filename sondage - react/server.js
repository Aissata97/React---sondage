'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express()

// parse application/json
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

const fileName = 'survey.config.json'
const resultFilename = 'result.js'

const PORT = 8080
const HTTP_OK = 200
const CONTENT_TYPE_JSON = 'application/json'
const CONTENT_TYPE_HTML = 'text/html'

app.use(function (request, response, next) {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    response.setHeader('Access-Control-Allow-Credentials', 'true')
    next()
})

app.get('/', function (request, response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_HTML })
    response.end('<h1>Home page</h1>')
})

app.get('/forms', function (request, response) {
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    const data = fs.readFileSync(fileName)
    JSON.parse(data)
    response.end(data)
})

app.post('/result', function (request, response) {
    const dataString = JSON.stringify(request.body, null, 2)
    fs.writeFileSync(resultFilename, dataString)
    response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    response.end(dataString)
})

app.listen(PORT, function () {
    console.log('Server listening on: http://localhost:%s', PORT)
})
