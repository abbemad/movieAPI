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
    };

    let get = function(req,res){
        // let home = 'http://localhost:8000/api/movies/';
        let home = 'https://stud.hosted.hr.nl/0920859/fullstack/';
        // let query = {};
        
        // Movie.find(query, function(err,movies){
        //   if(err)
        //       res.status(500).send(err);
        //      else 
        //         res.json(movies); 
        // }
        
        // );

        Movie.find(function(err,movies){
            if(err){
                 res.status(500).send(err);
                 
            }
                let start = req.query.start !== undefined ? parseInt(req.query.start) : null;
                let limit = req.query.limit !== undefined ? parseInt(req.query.limit) : null;
                
            if(start == 0){
                start = 1;
            }
            
            let pagination = {
                totalPages: limit !== null ? Math.ceil(movies.length / limit) : 1,
                currentItems: limit !== null ? limit : movies.length,
                currentPage: (start !== null && limit !== null) ? Math.ceil(start / limit) : 1
            };

            let AllResMovies = {
                items: [],
                _links: {
                self: {href: home}
                        },

            pagination: {
                totalItems: movies.length,
                totalPages: pagination.totalPages,
                currentItems: pagination.currentItems,
                currentPage: pagination.currentPage,
            
            _links: {
                next: {
                    page: pagination.totalPages !== pagination.currentPage ? pagination.currentPage + 1 : pagination.currentPage,
                    href: home + '?start=' + (start + pagination.currentItems) + '&limit=' + (limit || 5)
                },

                previous: {
                    page: (pagination.currentPage !== 1 ? pagination.currentPage - 1 : 1),
                    href: home + '?start=' + (start >= pagination.currentItems ? start - pagination.currentItems : 0) + '&limit=' + (limit || 5)
                },

                first: {
                    page: 1,
                    href: home + (limit ? '?limit=' + limit : '')
                },

                last: {
                    page: pagination.totalPages,
                    href: home + '?start=' + (limit ? (movies.length + 1) - limit : 0) + '&limit=' + (limit || 5)
                }
            }
        }
    };

    
            for (let i = start || 0, length = movies.length, l = 0; i < length && (limit !== null ? l < limit : 1); i++, l++) {
                let movie = movies[i];
                AllResMovies.items.push({
                    item: movie,
                    _links: {
                        self: {
                            href: home + movie._id
                        },
                        collection: {
                            href: home
                        }
                    }
                });
            }
            res.status(200).json(AllResMovies);
        });
    };
        //   if(err){
        //       res.status(500).send(err);
        //   }
        //      else 
        //         res.json(movies); 
        // }
        
        
        // );

        // if(req.query.genre){
        //     query.genre = req.query.genre;
        // }

    // };

    return{
        post: post,
        get: get
    };
};

module.exports = movieController;