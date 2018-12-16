let express = require('express');

let routes = function (Movie){
    let movieRouter = express.Router();


    movieRouter.route('/')
        .post(function(req, res){
            let movie = new Movie(req.body);
            
            // console.log(movie);
    
            movie.save();
            res.status(201).send(movie);
            // res.send(movie);
    
        })
    
        .get(function(req,res){
            let query = {};
    
            if(req.query.genre){
                query.genre = req.query.genre;
            }
    
            Movie.find(query, function(err,movies){
              if(err)
                  res.status(500).send(err);
                 else 
                    res.json(movies); 
            });
        });
    
    movieRouter.use('/:movieId', function(req,res,next){
        Movie.findById(req.params.movieId, function(err,movie){
            if(err)
                res.status(500).send(err);
                else if(movie){
                    req.movie = movie;
                    next();
                }
                    else{
                        res.status(404).send('Movie not found');
                    }
            });
    });

    movieRouter.route('/:movieId')
        .get(function(req,res){
            
            res.json(req.movie);
            // Movie.findById(req.params.movieId, function(err,movie){
            // if(err)
            //     res.status(500).send(err);
            //     else 
            //         res.json(movie); 
            // });
        })
        .put(function(req,res){
            req.movie.title = req.body.title;
            req.movie.actor = req.body.actor;
            req.movie.genre = req.body.genre;
            req.movie.available = req.body.available;
            req.movie.save ();
            res.json(req.movie);
        });
    return movieRouter;
};

module.exports = routes;