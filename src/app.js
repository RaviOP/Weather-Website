const path = require('path');
const express = require('express');
const route = require('./routers/routes')

console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express Config
const publicDirectoryPath = path.join(__dirname,'../public')

//Setup static directory in use
app.use(express.static(publicDirectoryPath))

app.use(route)

app.listen(port, () => {
    console.log('Server is Up on Port '+port)
})