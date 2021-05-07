const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=bf9eba5ac25335459df74118a3362b2d&query='+latitude + ','+longitude

    request({url: url, json: true}, (error, {body: {error1, current: {temperature, feelslike, weather_descriptions}}}) => {
        if(error){
            callback('Weather serviece unavailable!', undefined)
        }else if (error1){
            callback('Unable to find location!', undefined)
        }else {
            callback(undefined, {
                temperature,
                feelslike,
                weather_descriptions
            })
        }
    })
}

module.exports = forecast