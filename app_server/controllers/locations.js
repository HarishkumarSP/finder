/* GET home page */
const homeList = (req,res)=>{
    res.render('location-list',{title :'Home'});
};

/* GET loation page */
const locInfo = (req,res)=>{
    res.render('location-info',{title:'Location info'});
};

/* GET review page */
const addReview = (req,res)=>{
    res.render('location-review-form',{title:'Add review'});
};

module.exports = {
    homeList,
    locInfo,
    addReview     
}