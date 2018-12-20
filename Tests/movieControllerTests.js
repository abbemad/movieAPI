let should = require('should'),
sinon = require('sinon');

describe('Movie controller tests', function(){
    describe('Post', function(){
        it('should not have empty title on post', function(){
           let Movie = function(movie) {this.save = function(){}};

           let req = {
               body: {
                   actor: ''
               }
           }

           let res = {
                status: sinon.spy(),
                send: sinon.spy()
           }

           let movieController = require('../controllers/movieController')(Movie);

           movieController.post(req,res);

           res.status.calledWith(400).should.equal(true, 'Bad status' + res.status.args[0][0]);
           res.send.calledWith('Title is required').should.equal(true);
        })
    })
})