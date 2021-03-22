const mongoose = require('mongoose');

const openingTimeSchema = new mongoose.Schema({
    days:{
        type : String,
        required : true
    },
    opening : String,
    closing : String, 
    closed:{
        type: Boolean,
        required : true 
    }
});

const reviewScheme =  new mongoose.Schema({
    author: String,
    ratings : {
        type : Number,
        default : 0,
        min : 0, 
        max : 5
    },
    reviewText: String,
    createdOn:{
        type:Date,
        default : Date.now
    }
});

const locationSchema = new mongoose.Schema({ 
    name: {
        type : String,
        required : true
    },
    address : String,
    ratings : {
        type : Number,
        default : 0,
        min : 0, 
        max : 5
    },
    facilities : [String],
    coords : {
        type : { type : String },
        coordinates : [Number]
    },
    openingTimes: [ openingTimeSchema ],
    reviews: [ reviewScheme ]
});
locationSchema.index({ coords : '2dsphere' }); 

mongoose.model('location',locationSchema)


