const request = require('request')

const geocode = (address, callback) => {
    const urlGeocoding = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?limit=1&access_token=pk.eyJ1IjoiYnJvd25lcjM0MiIsImEiOiJja29iaWNpNnozMDVrMndscHYxamRzeGhlIn0.aVZubrokePNXxYXlFzWpHg'

    request({url: urlGeocoding, json: true}, (error, {body: {features}}) => {
        if (error){
            callback('Unable to connect to location servicies!', undefined)
        }else if (features.length == 0){
            callback('Wrong city provided!', undefined)
        }else {
            callback(undefined,{
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name
            })
        }
    })
}

module.exports = geocode