const request = require('postman-request')

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2a4ac944d6421516632b08a4d9827b7d&query='+latitude+','+longitude

    request({url: url,json: true},(error,{ body })=> {
        if (error){
            callback("Unable to Connect to Weather Service",undefined)
        }else if (body.error) {
            callback("Unable to find Location",undefined)
        }else{
            callback(undefined,("Temperature is "+body.current.temperature+" Degrees.It Feels like "+body.current.feelslike+" Degrees.Weather is "+body.current.weather_descriptions[0]))
        }
    })
}

module.exports = forecast