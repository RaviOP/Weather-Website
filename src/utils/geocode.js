const request = require('postman-request')

const geoCode = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2a4ac944d6421516632b08a4d9827b7d&query='+encodeURIComponent(address);

    request({url: url,json: true},(error, { body }) => {
        if (error) {
            callback('Unable to connect to Weather Service', undefined)
        }
        else if(body.error){
            callback('Unable to find Location.Please Specify a Valid Location', undefined)
        }
        else {
            callback(undefined,{
                Latitude: body.location.lat,
                Longitude: body.location.lon,
                Location: body.location.name
            })
        }
    })
}

module.exports = geoCode