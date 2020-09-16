const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const app = express()

//Define paths for Express Config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory in use
app.use(express.static(publicDirectoryPath))


app.get('',(req,res) => {
    res.render('index',{
        title: "Weather App",
        name: "Ravi"
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: "About Me",
        name: "Ravi"
    })
})

app.get('/help',(req,res)=> {
    res.render('help',{
        title: "Help",
        message: "Some Helpful Text",
        name: "Ravi"
    })
})
app.get('/weather',(req,res) => {
    if (!req.query.address)
    {
        return res.send({
            error: "You must provide an Address"
        })
    }
    geoCode(req.query.address,(error, { Latitude,Longitude,Location}={}) => {
        if (error){
            return res.send({
                "Error" : error
            })
        }
        forecast(Latitude,Longitude,(error, forecastdata) => {
            if (error){
                return res.send({
                    "Error":error
                })
            }
            res.send({
                'Location' : Location,
                'Data' : forecastdata,
                'Address' : req.query.address
            })
        })
    })
})
app.get('/products',(req,res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: "404",
        errorMessage: "Help Article Not Found",
        name: "Ravi"
    })
})
app.get('*',(req,res) => {
    res.render('404',{
        title: '404',
        errorMessage: "Page Not Found",
        name: "Ravi"
    })
})

app.listen(3000, () => {
    console.log('Server is Up on Port 3000')
})