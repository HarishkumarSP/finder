const express =  require('express');
const router =  express.Router();
const cntrlLocations = require('../controllers/locations');
const cntrlReviews = require('../controllers/reviews')

//locations
router
.route('/locations')
.get(cntrlLocations.locationsListByDistance)
.post(cntrlLocations.locationCreate);

router
.route('/locations/:locationid')
.get(cntrlLocations.locationsReadOne)
.put(cntrlLocations.locationsUpdateOne)
.delete(cntrlLocations.locationsDeleteOne)

//reviews
router
.route('/locations/:locationid/reviews')
.post(cntrlReviews.reviewsCreate)

router
.route('/locations/:locationid/reviews/:reviewid')
.get(cntrlReviews.reviewsReadOne)
.put(cntrlReviews.reviewsUpdateOne)
.delete(cntrlReviews.reviewsDeleteOne);


module.exports = router;





