const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b92210d6e2237370649373f80e3292ca&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.success === false) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + 'º degress out. It feels like ' + body.current.feelslike + 'º degress.')
        }
    })
}



module.exports = forecast