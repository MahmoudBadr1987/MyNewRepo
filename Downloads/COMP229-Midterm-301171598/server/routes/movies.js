//    COMP229-MidTerm-301171598
// Mahmoud Eltoukhy 301171598  


// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// call the movies model
let movies = require('../models/movies');

/* GET movies List page. READ */
router.get('/', (req, res, next) => {
  // find all movie in the books collection
  movies.find( (err, list) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('movies/index', {
        title: 'Movies',
        list: list
      });
    }
  });

});


//////////////////////////////////////////////////   CREATE OPERATION ///////////////////////////////////////////////////////////////////////////

//  GET the Movies Details page in order to add a new Movies
let newMovie = movies();
router.get('/add', (req, res, next) => 
{ 
   res.render("movies/detail", {title:'Add a movie', list:newMovie})
    /*****************
     * ADD CODE HERE *
     *****************/

});

// POST process the Movies Details page and create a new Movies - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     let newMovie = movies   
     ({    
        // "_id": req.body.id,
        "Title": req.body.Title,
        "Description": req.body.Description,    
        "Released": req.body.Released,
        "Director": req.body.Director,
        "Genre": req.body.Genre,
     });
 
     movies.create(newMovie, (err,list) => 
     {   
         if(err)
         {
             console.log(err);
             res.end(err);
         }
         else
         {
             // refresh the book list
             console.log(list)
             res.redirect("/movies");
         }
        
      });
});





//////////////////////////////////////////////////   UPDATE OPERATION ///////////////////////////////////////////////////////////////////////////

// GET the Movies Details page in order to edit an existing Movies
router.get('/details/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     let id = req.params.id;

     movies.findById(id, (err, movieToEdit) =>     // Movie
     {   
         if(err)
         {
             console.log(err);
             res.end(err);
         }
         else
         {
             //show the edit view
             res.render('movies/details', {title: 'Edit a movie', movie: movieToEdit})
         }
      })

});

// POST - process the information passed from the details form and update the document
router.post('/details/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     let id = req.params.id

     let updatedMovie = movies   
     ({    
        "_id": req.body.id,
        "Title": req.body.Title,
        "Description": req.body.Description,    
        "Released": req.body.Released,
        "Director": req.body.Director,
        "Genre": req.body.Genre,
     });
 
     movies.updateOne({_id: id}, updatedMovie, (err) => 
     {   
         if(err)
         {
             console.log(err);
             res.end(err);
         }
         else
         {
             // refresh the book list
             console.log(req.body)
             res.redirect("/movies");
         }
      });
});




//////////////////////////////////////////////////   DELETE OPERATION ///////////////////////////////////////////////////////////////////////////

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => { 

    /*****************
     * ADD CODE HERE *
     *****************/

     let id = req.params.id;

     movies.remove({_id:id}, (err) =>
     {   
         if(err)
         {
             console.log(err);
             res.end(err);
         }
         else
         {
             //show the edit view
             res.redirect('/movies')
         }
      })
});


module.exports = router;
