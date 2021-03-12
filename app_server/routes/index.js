const express = require('express');
const router = express.Router();
const cntrlLocations = require('../controllers/locations');
const cntrlOthers = require('../controllers/others');

/* GET locations page */
router.get('/',cntrlLocations.homeList);
router.get('/location',cntrlLocations.locInfo);
router.get('/location/review/new',cntrlLocations.addReview);

/* GET About page. */
router.get('/about',cntrlOthers.about);
module.exports = router;


