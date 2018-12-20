let movieController = function(Movie){

    let post = function(req, res){
        let movie = new Movie(req.body);

        if(!req.body.title){
            res.status(400);
            res.send('Movie title required');
        }
        else{
            movie.save();
            res.status(201);
            res.send(movie);
        }
    }

    let get = function(req,res){
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
    }

    return{
        post: post,
        get: get
    }
}

module.exports = movieController;