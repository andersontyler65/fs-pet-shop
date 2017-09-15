'use strict'

let fs = require('fs')
const path = require('path')
const petsPath = path.join(__dirname, 'pets.json')

const express = require('express')
const app = express()
const port = process.env.PORT || 8000;

app.disable('x-powered-by')

app.get('/pets', function(req, res) {
  fs.readFile(petsPath , 'utf8', function(err, data) {
    if (err) {
      console.error(err.stack)
      return res.sendStatus(500)
    }
    var pets = JSON.parse(data)

    res.send(data)
  })
})

app.use(function(req, res) {
  res.sendStatus(404)
})

app.listen(port, function() {
  console.log('Listening on port', port)
})





module.exports = app;
