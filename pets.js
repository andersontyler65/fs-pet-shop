'use strict'

const fs = require('fs')
const path = require('path')
var cmdArr = (process.argv, 'pets.json')

fs.readFile(cmdArr, 'utf8', function(err, data) {
  if (err) {
    throw err;
  }
  var pets = JSON.parse(data);
  console.log(pets)
})
