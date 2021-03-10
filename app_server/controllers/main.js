/* GET home page. */
const index = (req,res)=>{
    res.render('index',{title: 'Express' });
};

/* Exposes the index function as a method */
module.exports = {
    index
};