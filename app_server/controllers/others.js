/* GET about page. */
const about = (req,res)=>{
    res.render('about-list',{title: 'About' });
};

/* Exposes the about function as a method */
module.exports = {
    about
};

