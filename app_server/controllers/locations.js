/* GET home page */
const homeList = (req,res)=>{
    res.render('location-list',{
        title :'Finder-find a place to work with wifi',
        pageHeader:{
            title:'Finder',
            strapline:'Find a place to work with wifi near you!'
        },
        sidebar: "Looking for wifi and a seat? Finder helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Finder help you find the place you're looking for.",
        locations:[{
             name:'Starbucks',
             address:'125 High Street, Reading, RG6 1PS',
             ratings:4,
             distance:'100m',
             facilities:['Hot drinks','Food','Premium wifi']
        },
        {
            name:'Tea stall',
            address:'125 High Street, Reading, RG6 1PS',
            ratings:3,
            distance:'200m',
            facilities:['Hot drinks','Biscuits','Television']
       },
       {
        name:'Pizza hut',
        address:'125 High Street, Reading, RG6 1PS',
        ratings:5,
        distance:'400m',
        facilities:['tasty pizzas','Beverages','Natural place']
   }]
    });
};

/* GET loation page */
const locInfo = (req, res) => {
    res.render('location-info',
      {
        title: 'Starbucks',
         pageHeader: {
          title: 'Finder',
        },
        sidebar: {
          context: 'is on Finder because it has accessible wifi and space to sit down with your laptop and get some work done.',
          callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
        },
        location: {
          name: 'Starbucks',
          address: '125 High Street, Reading, RG6 1PS',
          ratings: 4,
          facilities: ['Hot drinks', 'Food', 'Premium wifi'],
          coords: {lat: 9.920962, lng: 78.125746},
          openingTimes: [
            {
              days: 'Monday - Friday',
              opening: '7:00am',
              closing: '7:00pm',
              closed: false
            },
            {
              days: 'Saturday',
              opening: '8:00am',
              closing: '5:00pm',
              closed: false
            },
            {
              days: 'Sunday',
              closed: true
            }
          ],
          reviews: [
            {
              author: 'Simon Holmes',
              rating: 5,
              timestamp: '16 July 2013',
              reviewText: 'What a great place. I can\'t say enough good things about it.'
            },
            {
              author: 'Charlie Chaplin',
              rating: 3,
              timestamp: '16 June 2013',
              reviewText: 'It was okay. Coffee wasn\'t great, but the wifi was fast.'
            }
          ]
        }
      }
    );
  };

/* GET review page */
const addReview = (req,res)=>{
    res.render('location-review-form',{
        title:'Review startcups on finder',
        pageHeader:{ title:'Review starcups' }
    });
};

module.exports = {
    homeList,
    locInfo,
    addReview     
}