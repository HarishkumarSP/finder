/* GET about page. */
const about = (req,res)=>{
    res.render('about-list',{
        title: 'About Finder',
        content:'Finder lets helps you to find the best locations near you hope its find and make your day great :) ' 
    });
};

/* Exposes the about function as a method */
module.exports = {
    about
};

