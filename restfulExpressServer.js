'use strict'
let fs = require('fs')
const path = require('path')
const petsPath = path.join(__dirname, 'pets.json')

const express = require('express')
const app = express()
const port = process.env.PORT || 8000;

const basicAuth = require('basic-auth')
const bodyParser = require('body-parser')
const morgan = require('morgan')


app.disable('x-powered-by')
app.use(morgan('short'))
app.use(bodyParser.json())

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

app.post('/pets', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, data) {
    if (err) {
      console.error(err.stack)
      return res.sendStatus(500)
    }

    //var id = Number(req.params.id)
    const pets = JSON.parse(data)
    const age = Number.parseInt(req.body.age)
    const kind = req.body.kind
    const name = req.body.name

    if (Number.isNaN(age) || !kind || !name) {
      return res.sendStatus(400)
    }

    const pet = { age, kind, name }

    pets.push(pet)

    const newPetsJSON = JSON.stringify(pets)

    fs.writeFile(petsPath, newPetsJSON, function(writeErr) {
      if (writeErr) {
        console.error(writeErr.stack)
        return res.sendStatus(500)
      }
      //res.set('Content-Type', 'text/plain');
      res.send(pet)
    })
  })
})

app.patch('/pets/:id', function(req, res) {
  fs.readFile(petsPath, 'utf8', function(readErr, petsJSON) {
    if (readErr) {
      //console.error(err.stack)
      return res.sendStatus(500)
    }

    let id = Number.parseInt(req.params.id)
    let pets = JSON.parse(data)

    if (id < 0 || id >= pets.length|| Number.isNaN(id)) {
      return res.sendStatus(404)
    }

    const age = Number.parseInt(req.body.age)
    const { kind, name} = req.body
    //var pet = req.body
    // var petLength = Object.keys(pet).length
    // console.log(pets.length)

    if (!pet) {
      return res.sendStatus(400)
    }

    pet[id] = pet

    // const age = Number.parseInt(req.body.age)
    // const kind = req.body.kind
    // const name = req.body.name

    // if (!Number.isNaN(age)) {
    //   return res.sendStatus(400)
    // }
    // if (kind) {
    //   pet.kind = kind
    // }
    //
    // if (name) {
    //   pet.name = name
    // }

    const newPetsJSON = JSON.stringify(pets)

    fs.writeFile(petsPath, newPetsJSON, function(err) {
      if (err)
        console.error(err.stack)
      return res.sendStatus(500)
    })
    res.set('Content-Type', 'text/html')
    res.send(pet)
    })
  })

  app.delete('/pets/:id', function (req, res) {
    fs.readFile(petsPath, 'utf8', function (err, PetsJSON) {
      if (err) {
        console.error(err.stack)
        return res.sendStatus(500)
      }
      const id = Number.parseInt(req.params.id)
      const pets = JSON.parse(data)

      if (id < 0 || id >= pets.length || Number.isNaN(id)) {
        return res.sendStatus(404)
      }
      const pet = pets.splice(id, 1)[0]
      const newPetsJSON = JSON.stringify(pets)

      fs.wrtieFile(petsPath, newPetsJSON, function (err) {
        if (err) {
          console.error(err.stack)
          return res.sendStatus(500)
        }
        res.set('Content-Type', 'text/plain')
        res.send(pet)
      })
    })
  })

app.use(function(err, req, res) {
  console.error(err.stack)
  res.sendStatus(404)
})

app.listen(port, function() {
  console.log('Listening on port', port)
})

module.exports = app
