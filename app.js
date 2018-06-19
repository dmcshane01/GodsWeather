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
    res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    request(url, function (err, response, body) {
        if(err){
            res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
            let weather = JSON.parse(body)
            if(weather.main == undefined){
                res.render('index', {weather: null, error: 'Error, please try again'});
            } else {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', {weather: weatherText, error: null});
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

/*
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var server = express();

// view engine setup
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');

server.use(logger('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(express.static(path.join(__dirname, 'public')));

server.use('/', indexRouter);
server.use('/users', usersRouter);

var port = process.env.PORT || 1337;


// catch 404 and forward to error handler
server.use(function(req, res, next) {
    console.log('Exwhat!')
  next(createError(404));
});
server.post('/', function (req, res) {
    let city = req.body.city;
    console.log('OKOKOK');
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    request(url, function (err, response, body) {
        if(err){
            res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
            let weather = JSON.parse(body)
            if(weather.main == undefined){
                res.render('index', {weather: null, error: 'Error, please try again'});
            } else {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', {weather: weatherText, error: null});
            }
        }
    });
})
// error handler
server.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.server.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

server.listen(port, function () {
    console.log('Example server listening on port 1337!')
})

module.exports = server;
*/