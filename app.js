let express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

let db = mongoose.connect('mongodb://localhost/movieAPI');

let Movie = require('./models/movieModel');


let app = express();

let port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

movieRouter = require('./Routes/movieRoutes')(Movie);

app.use('/api/movies', movieRouter);
// app.use('/api/actors', actorRouter);


app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(port, function () {
    console.log('Gulp run on port ' + port);
});