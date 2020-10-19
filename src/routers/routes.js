const express = require('express')
const router = express.Router()
const geoCode = require('../utils/geocode');
const forecast = require('../utils/forecast')

router.get('/',(req,res)=>{
    res.send(index)
})

router.get('/weather',(req,res) => {
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
                'Latitude' : Latitude,
                'Longitude' : Longitude,
                'Location' : Location,
                'Data' : forecastdata,
                'Address' : req.query.address
            })
        })
    })
})
router.get('/weather',(req,res)=>{
    forecast(req.query.lat,req.query.lon,(error, forecastdata) => {
        if (error){
            return res.send({
                "Error":error
            })
        }
        res.send({
            'Location' : Location,
            'Data' : forecastdata,
        })
    })
})

module.exports=router;