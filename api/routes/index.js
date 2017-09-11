var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controllers.js');
var ctrlReviews = require('../controllers/reviews.controllers.js');
var ctrlUsers = require('../controllers/users.controllers.js');
router
    .route('/hotels')
    .get(/*ctrlUsers.authenticate,*/ctrlHotels.hotelsGetAll)
    .post(ctrlHotels.hotelsAddOne);
//chain post

router
    .route('/hotels/:hotelId')
    .get(ctrlHotels.hotelsGetOne)
    //update document
    .put(ctrlHotels.hotelsUpdateOne)
    .delete(ctrlHotels.hotelsDeleteOne);

//review routes
router
    .route('/hotels/:hotelId/reviews')
    .get(ctrlReviews.reviewsGetAll)
    .post(ctrlReviews.reviewsAddOne);


router
//update reviews in mongoshell auto generate an _id
    .route('/hotels/:hotelId/reviews/:reviewId')
    .get(ctrlReviews.reviewsGetOne)
    .put(ctrlReviews.reviewsUpdateOne)
    .delete(ctrlReviews.reviewsDeleteOne);

// AUTHENTICATION
router
    .route('/users/register')
    .post(ctrlUsers.register);

router
    .route('/users/login')
    .post(ctrlUsers.login);
/**
 * db.hotels.update({}, {
  $set: {
    "reviews.0._id": ObjectId()
  }
},
 {
   multi:true
   })
 //zero because its object based

 db.hotels.update(
 {
   name: "Grand Hotel Palatino"
   }, {
  $set: {
    "reviews.1._id": ObjectId()
  }
},
 {
   multi:true
   })

 //doc has multiple reviews (so adress the second object in the array)
 //

 */
module.exports = router;
/**
 * GOLDEN RULES OF API Design:
 * Always return a response
 * Return the correct HTTP status code
 * return contents or a message
 */
