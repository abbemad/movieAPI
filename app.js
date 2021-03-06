let express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

db = mongoose.connect('mongodb://localhost/movieAPI');

let Movie = require('./models/movieModel');


let app = express();

let port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

movieRouter = require('./Routes/movieRoutes')(Movie);

app.use(function(req, res, next){
    if (req.accepts('json')){
        next();
    }   
    else {
        res.sendStatus(406);
    }
});

app.use('/api/movies', movieRouter);
// app.use('/api/actors', actorRouter);


app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(port, function () {
    console.log('Gulp run on port ' + port);
});

module.exports = app;