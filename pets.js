'use strict'

const fs = require('fs')
const path = require('path')
const petsPath = path.join('pets.json')
var regularEx=/read|create|update|destroy/
var counter=0;
const node = path.basename(process.argv[0])
const file = path.basename(process.argv[1])
const cmd = process.argv[2]
for(var i=0; i<process.argv.length; i++){
  if(regularEx.test(process.argv[i])===true){
    counter++;
  }
}
if(counter===0){
  console.error('Usage: node pets.js [read | create | update | destroy]')
  process.exit(1)
}
if (cmd === 'read') {
  fs.readFile(petsPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    const index = Number.parseInt(process.argv[3])
    const pets = JSON.parse(data)
    // console.log(pets)

    if (Number.isNaN(index)) {
      console.log(pets)
      process.exit()
    }

    if (index < 0 || index >= pets.length) {
      console.error(`Usage: ${node} ${file} ${cmd} INDEX`)
      process.exit(1)
    }
    console.log(pets[index])
  })
}
else if (cmd === 'create') {
  fs.readFile(petsPath, 'utf8', (readErr, data) => {
    if (readErr) {
      throw readErr;
    }
    const pets = JSON.parse(data)
    const age = Number.parseInt(process.argv[3])
    const kind = process.argv[4]
    const name = process.argv[5]

    if (Number.isNaN(age) || !kind || !name) {
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit(1)
    }
    const pet = {
      age,
      kind,
      name
    }

    pets.push(pet);

    const petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, (writeErr) => {
      if (writeErr) {
        throw writeErr
      }
      console.log(pet)
    })
  })
}
 else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`)
  process.exit(1)
}
