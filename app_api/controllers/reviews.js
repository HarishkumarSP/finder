const mongoose = require('mongoose');
const Loc = mongoose.model('location');

const reviewsCreate = (req,res) => {
    const locationId = req.params.locationid;
    if(locationId){
        Loc
        .findById(locationId)
        .select('reviews')
        .exec((err,location) => {
            if(err){
                res
                .status(400)
                .json(err);
            }
            else {
                doAddReview(req,res,location);
            }
        });
    }
    else {
        res
        .status(404)
        .json({
            "message" : "Location not found"
        });
    }
 };

const reviewsReadOne = (req,res) => {
    Loc
    .findById(req.params.locationid)
    .exec((err,location) =>{
        if(!location){
            return res
            .status(404)
            .json({
                "message": "location not found"
            });
        }
        else if(err){
            return res
            .status(400)
            .json(err);
        }
        if(location.reviews && location.reviews.length > 0){
            const review = location.reviews.id(req.params.reviewid);
            if(!review){
                return res
                .status(400)
                .json({
                    "message" : "review not found"
                });
            }
            else {
                response = {
                    location : {
                        id : location.id,
                        name : location.name
                    },
                    review
                }
                return res
                .status(200)
                .json(response)
            }
        }
        return res
        .status(404)
        .json({
            "message" : "No review found"
        })
    });
 };

const reviewsUpdateOne = (req,res) => {
    const {locationid,reviewid} = req.params;
    if(!locationid || !reviewid){
        res
        .status(404)
        .json({
            "message" : "please provide locationid and reviewid"
        });
        Loc
        .findById(locationid)
        .select('reviews')
        .exec((err,location) => {
            if(!location){
                res
                .status(404)
                .json({
                    "message" : "location not found"
                });
            }
            else if(err){
                res
                .status(400)
                .json(err)
            }
            if(location.reviews && location.reviews.length > 0) {
            const thisReview = location.reviews.id(reviewid)
            if(!thisReview){
                res
                .status(404)
                .json({
                    "message" : "Review not found"
                });
            }
            thisReview.author = req.body.author;
            thisReview.ratings = req.body.ratings;
            thisReview.reviewText = req.body.reviewText;
            location.save((err,location) => {
                if(err){
                    res
                    .status(404)
                    .json(err)
                }
                else {
                    updateAverageRating(location._id);
                    res
                    .status(200)
                    .json(thisReview)
                }
            })
        }   
    else {
        res
        .status(404)
        .json({
            "message" : "Sorry no review to update"
        });
    }
     });
    }
 };

const reviewsDeleteOne = (req,res) => {
    const { locationid,reviewid } = req.params;
    if(!locationid || reviewid){
        res
        .status(400)
        .json({
            "message" : "Not found,locationid and reviewid both are required"
        });
    }
    Loc
    .findById(locationid)
    .select('reviews')
    .exec((err,location) => {
        if(!location){
            res
            .status(404)
            .json({
                "message" : "location not found"
            });
        }
        else if(err){
            res
            .status(400)
            .json(err)
        }
        if(location.reviews && location.reviews.length > 0){
        if(!location.reviews.id(reviewid)){
            res
            .status(404)
            .json({
                "message" : "review not found"
            });
        }
        else{
            location.reviews.id(reviewid).remove()
            location.save(err => {
            if(err){
                res
                .status(404)
                .json(err)
            }
            else{
                updateAverageRating(location._id)
                res
                .status(204)
                .json(null)
            }
        });
    }
    }
    else{
        res
        .status(404)
        .json({
            "message" : "reviews are not available to delete"
        });
    }
    });
    
    


 };

const doAddReview = (req,res,location) => {
    if(!location){
        res
        .status(404)
        .json({
            "message" : "Location not found"
        });
    }
    else {
        const { author,rating,reviewText } = req.body;
        location.reviews.push({
            author,
            rating,
            reviewText
        });
        location.save((err,location) => {
            if(err){
                res
                .status(400)
                .json(err)
            }
            else {
                updateAverageRating(location._id)
                const thisReview = location.reviews.slice(-1).pop()
                res
                .status(201)
                .json(thisReview);
            }
        }) 
    }
}
const doSetAverageRating = (location) => {
    if (location.reviews && location.reviews.length > 0) {
        const count = location.reviews.length;
        const total = location.reviews.reduce((acc, {rating}) => {  // Uses the JavaScript array reduce method to sum up the x1ratings of the subdocument
        return acc + rating;
    }, 0);
        location.rating = parseInt(total / count, 10);
        location.save(err => {
            if (err) {
                console.log(err);
            }   
            else {
        console.log(`Average rating updated to ${location.rating}`);
    }
    });
    }
   };
const updateAverageRating = (locationId) => {        // Finds the location based on the provided location id data
    Loc.findById(locationId)
    .select('ratings reviews')
    .exec((err, location) => {
    if (!err) {
    doSetAverageRating(location);
    }
    res
    .status(400)
    .json(err)
    });
   };

   
module.exports = {
    reviewsCreate,
    reviewsReadOne,
    reviewsUpdateOne,
    reviewsDeleteOne
}