'use strict'
let fs = require('fs')
const path = require('path')
const petsPath = path.join(__dirname, 'pets.json')

const express = require('express')
const app = express()
const port = process.env.PORT || 8000;

const bodyParser = require('body-parser')
const morgan = require('morgan')


app.disable('x-powered-by')
app.use(morgan('short'))
app.use(bodyParser.json())

app.get('/pets', function(req, res){
  fs.readFile(petsPath, 'utf8', function(err, data){
    if (err){
      console.error(err.stack)
      return res.sendStatus(500)
    }
    var pets = JSON.parse(data)

    res.send(pets)
  })
})

app.post('/pets', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, newPetsJSON) {
    if (err) {
      console.error(err.stack)
      return res.sendStatus(500)
    }

    var pets = JSON.parse(newPetsJSON)
    var pet = req.body.name

    if (!pet) {
      return res.sendStatus(404)
    }
    pets.push(pet)

    var newPetsJSON = JSON.stringify(pets)

    fs.writeFile(petsPath, newPetsJSON, function(writeErr) {
      if (writeErr) {
        console.error(writeErr.stack)
        return res.sendStatus(500)
      }

      //res.set('Content-Type', 'text/plain')
      res.send(pet)
    })
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

module.exports = app
