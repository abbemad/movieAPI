let express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

let db = mongoose.connect('mongodb://localhost/movieAPI');

let Movie = require('./models/movieModel');


let app = express();

let port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

let movieRouter = express.Router();


movieRouter.route('/Movies')

    .post(function(req,res){
        let movie = new Movie(req.body);
        
        console.log(movie);

        movie.save();
        res.status(201).send(movie);
        // res.send(movie);

    })

    .get(function(req,res){
        Movie.find(function(err,movies){
          if(err)
              res.status(500).send(err);
             else 
                res.json(movies); 
        });
    });

app.use('/api', movieRouter);


app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(port, function () {
    console.log('Gulp run on port ' + port);
});