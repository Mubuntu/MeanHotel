var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

var runGeoQuery = function (req, res) {
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);

    //error trapping
    if (isNaN(lng) || isNaN(lat)) {
        res
            .status(400)
            .json({
                "message": " longitude: " + lng + " or latitude is wrong please correct it: " + lat
            });
    }

    //instead of creating another path for a geolocation
    //create a geolocation query

    //A geoJSON point
    var point = {
        type: "Point",
        coordinates: [lng, lat]
    };
    var geoOptions = {
        spherical: true,
        //specify max distance:
        maxDistance: 2000, //meters
        //specify number of records returned:
        num: 5
    };
    Hotel
        .geoNear(point, geoOptions, function (err, results, stats) {
            console.log('Geo results: ', results);
            console.log('Geo stats: ', stats);
            res
                .status(200)
                .json(results);
        });
}

module.exports.hotelsGetAll = function (req, res) {
console.log('Requested by: ',req.user);
    var offset = 0;
    var count = 5;
    var maxCount = 10;

    //check if req has lat/long value
    if (req.query && req.query.lat && req.query.lng) {
        runGeoQuery(req, res);
        return;
    }

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }

    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    if (isNaN(offset) || isNaN(count)) {
        res
            .status(400)//bad request
            .json({
                "message": "If supplied in querystring count and offset should be numbers"
            })
    }

    if (count > maxCount) {
        res
            .status(400)
            .json({
                "message": "Count limit of " + maxCount + " has been exceeded → " + count
            });
        return;
    }

    Hotel
        .find()
        .skip(offset)
        .limit(count)
        .exec(function (err, hotels) {
            //error trapping
            if (err) {
                res
                    .status(500) //internal server error
                    .json(err);
            } else {
                console.log("Found hotels", hotels.length);
                res
                    .json(hotels);
            }
        })
};

module.exports.hotelsGetOne = function (req, res) {
    var hotelId = req.params.hotelId;
    console.log('GET hotelId', hotelId);
    //error trapping
    Hotel
        .findById(hotelId)
        .exec(function (err, doc) {
            var response = {
                status: 200,
                message: doc
            };
            if (err) {
                console.log('error finding hotel')
                //response in een variabele zette zodat je niet constant code moet repliceren
                response.status = 500;//internal server error
                response.message = err;
            } else if (!doc) {
                response.status = 404;
                response.message = {
                    "message": "Hotel ID not found"
                };
            }

            res
                .status(response.status)
                .json(response.message);


        });

};
//helper function with splitting data in to an array
//empty string would get split into an array with a length of 1 with no values
var _splitArray = function (input) {
    var output;
    if (input && input.length > 0) {
        output = input.split(';');
    } else {
        output = [];
    }
    return output;
}
module.exports.hotelsAddOne = function (req, res) {
    Hotel
        .create({
            //contains data to be added to db
            name: req.body.name,
            description: req.body.description,
            stars: parseInt(req.body.stars, 10),
            services: _splitArray(req.body.services),
            photos: _splitArray(req.body.photos),
            currency: req.body.currency,
            location: {
                address: req.body.address,
                coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)]
            }
        }, function (err, hotel) {
            //callback will run after the create method is completed
            if (err) {
                console.log(" Error creating hotel");
                res
                    .status(400)
                    .json(err);
            } else {
                console.log(" Hotel created ", hotel);
                res
                    .status(201)
                    .json(hotel);
            }
        });
};

module.exports.hotelsUpdateOne = function (req, res) {
    var hotelId = req.params.hotelId;
    console.log('PUT hotelId', hotelId);
    //error trapping
    Hotel //exclude subdocs
        .findById(hotelId)
        .select("-reviews,-rooms")//these will not be included
        .exec(function (err, doc) {
            var response = {
                status: 200,
                message: doc
            };
            if (err) {
                console.log('error finding hotel')
                //response in een variabele zette zodat je niet constant code moet repliceren
                response.status = 500;//internal server error
                response.message = err;
            } else if (!doc) {
                response.status = 404;
                response.message = {
                    "message": "Hotel ID not found"
                };
            }

            if (response.status !== 200) {
                //hotel has been updated
                res
                    .status(response.status)
                    .json(response.message);
            } else {
                doc.name = req.body.name;
                doc.description = req.body.description;
                doc.stars = parseInt(req.body.stars, 10);
                doc.services = _splitArray(req.body.services);
                doc.photos = _splitArray(req.body.photos),
                    doc.currency = req.body.currency,
                    doc.location = {
                        address: req.body.address,
                        coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)]
                    };
                doc.save(function (err, hotelUpdated) {
                    if (err) {
                        console.log("couldnt save hotel ");
                        res.status(500).json(err);
                    } else {
                        res
                            .status(204)
                            .json();//204 does not have any contents
                    }
                });
            }
        });
};

module.exports.hotelsDeleteOne = function (req, res) {
    var id = req.params.hotelId;

    Hotel
        .findByIdAndRemove(id)
        .exec(function (err, hotel) {
            //204 bij een juiste delete
            //var deletedHotel;
            //hotel wordt bij 204 niet teruggegeven als json
            if (err) {
                res
                    .status(404)
                    .json(err);
            } else {
                console.log(" Hotel deleted id: ", id);
                res.status(204)
                    .json();
            }
        });
};