const express = require('express');
const router = express.Router(); 
const cntrlLocations = require('../controllers/locations');
const cntrlAbout = require('../controllers/about');

/* GET locations page */
router.get('/',cntrlLocations.homeList);
router.get('/location/:locationid',cntrlLocations.locInfo);
router.get('/location/review/new',cntrlLocations.addReview);

/* GET About page. */
router.get('/about',cntrlAbout.about);
module.exports = router;


