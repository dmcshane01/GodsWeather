const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = 'd6de5e5df996b830871c8b772ca80679';

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
//app.use('/js', express.static(__dirname + '/node_modules/bootstrap4/dist/js')); // redirect bootstrap JS
//app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.set('view engine', 'ejs')
var port = process.env.PORT || 3000;

app.get('/', function (req, res) {
    res.render('index', {weather: null, forecast: null, error: null});
})

app.post('/', function (req, res) {

    if(req.body.city.length == 5){
        //todo checking for zip code
    }

    var id = ''; //prob bad javascript practice lol
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    let weatherText = '';
    var url2 = '';


    request(url, function (err, response, body) {
        if(err){
            res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
            let weather = JSON.parse(body)
            if(weather.main == undefined){
                res.render('index', {weather: null, error: 'Error, please try again'});
            } else {

                weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                id = weather.id; //gets accurate city id for forecast
                url2 = `http://api.openweathermap.org/data/2.5/forecast?id=${id}&appid=${apiKey}`;

                request(url2, function (err, response, body) {
                    console.log('FORECAST' + id);
                    if(err){
                        res.render('index', {forecast: null, weather: null, error: 'Error, please try again 1st'});
                    } else {
                        let forecast = JSON.parse(body);
                        //let forecast2 = JSON.parse(forecast.list[0].weather);
                        if(forecast == undefined){
                            res.render('index', {forecast: null, weather: null, error: 'Error, please try again 2nd'});
                        } else {
                            let forecastText = '';
                            for(i = 0; i < 5; i++){
                                //forecastText += '\nDay ' + (i+1) + ': ' + forecast.list[i].weather[0].main;
                            }

                            res.render('index', {forecast: forecast, weather: weatherText, error: null});

                            console.log(forecast.list[0].weather[0].main);
                        }
                    }
                });

               // res.render('index', {weather: weatherText, error: null});
            }
        }
    });




})

app.get('/about', function(req, res) {
    res.render('about');
});

app.listen(port, function () {
    console.log('Example app listening on port 3000!')
})

