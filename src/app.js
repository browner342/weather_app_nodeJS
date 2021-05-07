const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

// Define paths for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup hanldebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicPath)) 

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Tomek'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Tomek'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Tomek',
        helpMessage: 'LOL I do not want to do it xdddddddddd',
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address)
        return res.send({
            error: 'No address provided'
        })
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) 
            return res.send({error})
        
        forecast(latitude, longitude, (error, {weather_descriptions, temperature, feelslike} = {}) => {
            if (error)
                return res.send({error})
            
            return res.send({
                forecast:'In ' + location + ' weather is ' + weather_descriptions + ', ' + temperature + ' degree but it feels like '+feelslike,
                location,
                address: req.query.address,
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('notFound', {
        title: '404',
        name: 'Tomek',
        message: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('notFound', {
        title: '404',
        name: 'Tomek',
        message: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up and running on port 3000')
})