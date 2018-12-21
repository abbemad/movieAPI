let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let movieModel = new Schema({
    title: {type: String},
    actor: {type: String},
    genre: {type: String}
});

module.exports= mongoose.model('Movie', movieModel);
