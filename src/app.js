const path = require('path')

//Setup weather api functions
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Setup express
const express = require('express')

//Setup Handlebars
const hbs = require('hbs')
const { response } = require('express')


//Setup app definitions of Express
const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

const name = 'Jonatas Sallazar'

//Creation of the main page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: "I'm here to help you!",
        name
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, forecastData, imgLink) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
                imgLink
            })
        })
    })

})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help Page',
        message: 'Help article not found.',
        name
    })
})

//Setup app 404 page
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        message: 'Page not found.',
        name
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})