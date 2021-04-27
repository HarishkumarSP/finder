const request =  require('request');
const apiOptions = {
  server : 'http://localhost:4000'
}
if(process.env.NODE_ENV === 'production'){
  apiOptions.server = 'https://guarded-springs-47018.herokuapp.com'
}

/* GET home page */
const homeList = (req,res) => {
  const path = '/api/locations';
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {},
    qs: { 
    lng: 78.143874,
    lat:  9.931301,
    maxDistance: 20
    }};
    request(requestOptions,(err,{statusCode},body) => {
      let data = [];
      if(statusCode === 200 && body.length){
      data = body.map((item)=> {
        item.distance = formatDistance(item.distance)
        return item;
      });
    }
      renderHomePage(req,res,data)
    });
 };

 
const renderHomePage = (req,res,body) => {
  let message = null;
  if(!(body instanceof Array)){
    message = 'API lookup error'
    body = [];
  }
  else if(!body.length){
      message = "No places found nearby"
  }
  res.render('locations-list',{
    title :'Finder-find a place to work with wifi and best foods',
    pageHeader:{
        title:'Finder',
        strapline:'Find a place to work with wifi near you and best foods!'
    },
    sidebar: "Looking for wifi and a seat? Finder helps you find places to work when out and about. Perhaps with food, cake or a pint? Let Finder help you find the place you're looking for.",
    locations: body,
    message
});
}

const formatDistance = (distance) => {
  let thisDistance = 0;
  let unit = 'm';
  if(distance > 1000){
    thisDistance = parseFloat(distance/1000).toFixed(1)
    unit = 'km';
  } 
  else{
    thisDistance = Math.floor(distance)
  }
  return thisDistance + unit;
};

const showError = (req,res,statusCode) => {
  
}

/* GET loation page */
const locInfo = (req, res) => {
  const path = `/api/locations/${req.params.locationid}`;
  const requestOptions = {
    url : `${apiOptions.server}${path}`,
    method : 'GET',
    json : {}
  };
  request(requestOptions,(err,{statusCode},body) => {
    const data = body;
    if(statusCode === 200){
    data.coords = {
      lng : body.coords[0],
      lat : body.coords[1]  
    }
    renderLocationPage(req,res,data);
  }
  else {
    showError(req,res,statusCode)
  }
});
};

const renderLocationPage = (req,res,location) => {
    res.render('location-info',
      {
        title: location.name,
         pageHeader: {
          title: location.name,
        },
        sidebar: {
          context: 'is on Finder because it has accessible wifi and space to sit down with your laptop and get some work done.',
          callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
        },
        location
      });
};


/* GET review page */
const addReview = (req,res)=>{
    res.render('location-review-form',{
        title:'Review Hotel Sree Sabarees on finder',
        pageHeader:{ title:'Review Hotel Sree Sabarees' }
    });
};



module.exports = {
    homeList,
    locInfo,
    addReview 
}


