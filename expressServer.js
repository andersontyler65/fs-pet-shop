'use strict'

let fs = require('fs')
const path = require('path')
const petsPath = path.join(__dirname, 'pets.json')

const express = require('express')
const app = express()
const port = process.env.PORT || 8000;

app.disable('x-powered-by')

app.get('/pets', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, data) {
    if (err) {
      console.error(err.stack)
      return res.sendStatus(500)
    }
    var pets = JSON.parse(data)

    res.send(pets)
  })
})

app.get('/pets/:id', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, data) {
    if (err) {
      console.error(err.stack)
      return res.sendStatus(500)
    }
    var id = Number.parseInt(req.params.id)
    var pets = JSON.parse(data)

    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(404)
    }
    res.send(pets[id])
  })
})

app.use(function(req, res) {
  res.sendStatus(404)
})

app.listen(port, function() {
  console.log('Listening on port', port)
})

module.exports = app;
