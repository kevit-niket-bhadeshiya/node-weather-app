const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoForecast = require('./utils/geoForeAxios');


const app = express();
const port = process.env.PORT ||  3000;


// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index.hbs', {
        title: 'Weather',
        name: 'Niket Bhadeshiya'
    });
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'About Me',
        name: 'Niket Bhadeshiya'
    })
})

app.get('/help', (req, res) => {
    res.render('help.hbs', {
        msg: 'This is Help',
        title: 'Help',
        name: 'Niket Bhadeshiya'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an Address'
        })
    }

    geoForecast.fetchGeocoding(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({ error })
        }

        geoForecast.fetchWeather(latitude, longitude, (error, forecastData = undefined) => {

            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

        })
    })
})

app.get('/weatherByItself', (req, res) => {
    if(!req.query.latitude || !req.query.longitude) {
        return res.send({
            error: 'You must proovide an latitude and longitude'
        })
    }

    geoForecast.fetchWeather(req.query.latitude, req.query.longitude, (error,  forecastData = undefined) => {
        if(error) {
            return res.send({ error })
        }

        res.send({
            forecast: forecastData,
        })
    })
})


app.get('/help/*', (req, res) => {
    res.render('404.hbs', {
        title: '404',
        name: 'Nik',
        errorMsg: 'Help article not found'
    });
})

app.get('*', (req, res) => {
    res.render("404.hbs", {
        title: '404',
        name: 'Nik',
        errorMsg: 'Page Not Found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})