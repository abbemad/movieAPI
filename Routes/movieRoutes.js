let express = require('express');

let routes = function (Movie){
    let movieRouter = express.Router();
    let movieController = require('../Controllers/movieController')(Movie);


    movieRouter.route('/')
        .post(movieController.post)
        .get(movieController.get)

        .options(function(err,res){
            res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
            res.header('Allow','POST,GET,OPTIONS');
            res.send(200);
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
        .options(function(err,res){
            res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,DELETE,OPTIONS');
            res.header('Allow','GET,PUT,DELETE,OPTIONS');
            res.header('Accept','application/json');
            res.send(200);
        })

        .get(function(req,res){
            let home = 'http://localhost:8000/api/movies/';
            // let home = 'https://stud.hosted.hr.nl/0920859/fullstack/';
            let reqMovie = req.movie.toJSON();
            reqMovie._links = {
                self: {
                    href: home + reqMovie._id
                },
                collection: {
                    href: home
                }
            };

            res.json(reqMovie);
            
        })

        .put(function(req,res){
            req.movie.title = req.body.title;
            req.movie.actor = req.body.actor;
            req.movie.genre = req.body.genre;
            
            req.movie.save (function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.movie);
                }  
            });
        })
        
        .patch(function(req,res){
            if(req.body._id)
                delete req.body._id;

            for(let p in req.body){
                req.movie[p] = req.body[p];
            }

            req.movie.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.movie);
                }  
            });
        })
        .delete(function(req,res){
            req.movie.remove(function(err){
                if (err)
                    res.status(500).send(err);
                else{
                    res.status(204).send('Removed');
                }
            });
        });
    return movieRouter;
};

module.exports = routes;