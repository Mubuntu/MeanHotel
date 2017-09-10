var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');


//get all reviews for a hotel
module.exports.reviewsGetAll = function (req, res) {
    var hotelId = req.params.hotelId;
    console.log('GET hotelId', hotelId);

    Hotel
        .findById(hotelId)
        .select('reviews') //select only the reviews from hotelument (instead of the whole doc filtered down
        .exec(function (err, doc) {
            var response = {
                status: 200,
                message: []
            };
            if (err) {
                console.log("Error finding hotel");
                response.status = 500;
                response.message = err;
            } else if (!doc) {
                console.log("Hotel id not found in database, ", id);
                response.status = 404;
                response.message = {
                    "message": "Hotel ID not found " + hotelId
                };
            } else {
                response.message = doc.reviews ? doc.reviews : [];
            }
            //console.log("returned doc: " + doc);
            res
                .status(response.status)
                .json(response.message);
        })


};


//get 1 specific Review by reviewId
module.exports.reviewsGetOne = function (req, res) {
    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;
    console.log('GET reviewId ' + reviewId + ' for hotelId ' + hotelId);

    Hotel
        .findById(hotelId)
        .select('reviews')
        .exec(function (err, hotel) {
            var response = {
                status: 200,
                message: {}
            };
            if (err) {
                console.log("Error finding hotel");
                response.status = 500;
                response.message = err;
            } else if (!hotel) {
                console.log("Hotel id not found in database", id);
                response.status = 404;
                response.message = {
                    "message": "Hotel ID not found " + id
                };
            } else {
                // Get the review
                response.message = hotel.reviews.id(reviewId);
                // If the review doesn't exist Mongoose returns null
                if (!response.message) {
                    response.status = 404;
                    response.message = {
                        "message": "Review ID not found " + reviewId
                    };
                }
            }
            res
                .status(response.status)
                .json(response.message);
        });

};

//helper function to create a review
var _addReview = function (req, res, hotel) {
    //add a review to an existing hotel and save that hotel
    hotel.reviews.push({
        name: req.body.name,
        rating: parseInt(req.body.rating, 10),
        review: req.body.review
        //date is defaulted to date.now
        //cant save subdoc only parent doc
    });

    hotel.save(function (err, hotelUpdated) {
        if (err) {
            console.log("review could not be saved");
            res
                .status(500)
                .json(err);
        } else {
            res
                .status(201)
                .json(hotelUpdated.reviews[hotelUpdated.reviews.length - 1]);
            //only return the lastInserted review
        }
    });//runs on model instance (the injected hotel)
}

//POST a review
module.exports.reviewsAddOne = function (req, res) {
    var hotelId = req.params.hotelId;
    console.log('Post review to  hotelId', hotelId);

    Hotel
        .findById(hotelId)
        .select('reviews') //select only the reviews from hotelument (instead of the whole doc filtered down
        .exec(function (err, doc) {
            var response = {
                status: 200,
                message: doc
            };
            if (err) {
                console.log("Error finding hotel");
                response.status = 500;
                response.message = err;
            } else if (!doc) {
                console.log("Hotel id not found in database, ", id);
                response.status = 404;
                response.message = {
                    "message": "Hotel ID not found " + hotelId
                };
            }
            if (doc) {
                _addReview(req, res, doc);
            }
            //console.log("returned doc: " + doc);
            res
                .status(response.status)
                .json(response.message);
        })
};
module.exports.reviewsUpdateOne = function (req, res) {
    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;
    console.log('PUT reviewId ' + reviewId + ' for hotelId ' + hotelId);

    Hotel
        .findById(hotelId)
        .select('reviews')
        .exec(function (err, hotel) {
            var thisReview = {}; //de ongewijzigde review
            var response = {
                status: 200,
                message: {}
            };
            if (err) {
                console.log("Error finding hotel");
                response.status = 500;
                response.message = err;
            } else if (!hotel) {
                console.log("Hotel id not found in database", id);
                response.status = 404;
                response.message = {
                    "message": "Hotel ID not found " + id
                };
            } else {
                // Get the review
                thisReview = hotel.reviews.id(reviewId);
                // If the review doesn't exist Mongoose returns null
                if (!thisReview) {
                    response.status = 404;
                    response.message = {
                        "message": "Review ID not found " + reviewId
                    };
                }
            }
            if (response.status !== 200) {
                res
                    .status(response.status)
                    .message(response.message);
            }
            else {
                thisReview.name = req.body.name;
                thisReview.rating = parseInt(req.body.rating, 10);
                thisReview.review = req.body.review;
                hotel.save(function (err, hotelUpdated) {
                    if (err) {
                        res
                            .status(500)
                            .json(err);
                    } else {
                        res
                            .status(204)
                            .json();
                    }
                })
            }
        });

};

module.exports.reviewsDeleteOne = function(req,res){
    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;
    console.log('PUT reviewId ' + reviewId + ' for hotelId ' + hotelId);

    Hotel
        .findById(hotelId)
        .select('reviews')
        .exec(function (err, hotel) {
            var thisReview = {}; //de ongewijzigde review
            var response = {
                status: 200,
                message: {}
            };
            if (err) {
                console.log("Error finding hotel");
                response.status = 500;
                response.message = err;
            } else if (!hotel) {
                console.log("Hotel id not found in database", id);
                response.status = 404;
                response.message = {
                    "message": "Hotel ID not found " + id
                };
            } else {
                // Get the review
                thisReview = hotel.reviews.id(reviewId);
                // If the review doesn't exist Mongoose returns null
                if (!thisReview) {
                    response.status = 404;
                    response.message = {
                        "message": "Review ID not found " + reviewId
                    };
                }
            }
            if (response.status !== 200) {
                res
                    .status(response.status)
                    .message(response.message);
            }
            else {
                //mongoose methode
                hotel.reviews.id(reviewId).remove();
                hotel.save(function (err, hotelUpdated) {
                    if (err) {
                        res
                            .status(500)
                            .json(err);
                    } else {
                        res
                            .status(204)
                            .json();
                    }
                })
            }
        });
};