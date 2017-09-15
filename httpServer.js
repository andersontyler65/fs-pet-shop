'use strict'

let fs = require('fs')
const path = require('path')
const petsPath = path.join(__dirname, 'pets.json')

const http = require('http')
const port = process.env.PORT || 8000;

const server = http.createServer(function(req, res) {
  if (req.method === 'GET' && req.url === '/pets') {
    fs.readFile(petsPath, 'utf8', function(err, data) {
      if (err) {
        console.error(err.stack)
        res.statusCode = 500
        res.setHeader('Content-Type', 'text/plain')
        return res.end('Internal Server Error')
      }
      res.setHeader('Content-Type', 'application/json')
      res.end(data)
    })

}
else if (req.method ==='GET' && req.url === '/pets/0') {
  fs.readFile(petsPath, 'utf8', function(err, data){
    if (err) {
      console.error(err.stack)
      res.statusCode = 500
      res.setHeader('Content-Type', 'text/plain')
      return res.end('Internal Server Error')
    }

    const pets = JSON.parse(data)
    const petJSON = JSON.stringify(pets[0])

    res.setHeader('Content-Type', 'application/json')
    res.end(petJSON)
  })
}
    else if (req.method === 'GET' && req.url === '/pets/1') {
      fs.readFile(petsPath, 'utf8', function(err, data) {
        if (err) {
          console.eror(err.stack)
          res.statusCode = 500
          res.setHeader('Content-Type', 'text/plain')
        return res.end('Internal ServerError')
        }

        var pets = JSON.parse(data)
        var petJSON = JSON.stringify(pets[1])

        res.setHeader('Content-Type', 'application/json')
        res.end(petJSON)
      })
    }
  //end
  else {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain')
    res.end('Not Found')
  }
})

server.listen(port, function() {
  console.log('Listening on port', port)
})


module.exports = server
