/* GET home page */
const homeList = (req,res)=>{
    res.render('location-list',{
        title :'Finder-find a place to work with wifi and best foods',
        pageHeader:{
            title:'Finder',
            strapline:'Find a place to work with wifi near you and best foods!'
        },
        sidebar: "Looking for wifi and a seat? Finder helps you find places to work when out and about. Perhaps with food, cake or a pint? Let Finder help you find the place you're looking for.",
        locations:[{
             name:'Hotel Sree Sabarees',
             address:'1, Pankajam Colony, Kamarajar Salai, Tamil Nadu 625009',
             ratings:4,
             distance:'100m',
             facilities:['Hot drinks','Foods and salads','Ice cream','Pure veg']
        },
        {
            name:'Domino\'s Pizza',
            address:'Domino\'s Pizza Ground Floor, SHIVSHAKTI Plaza, No. 28, 80 Feet Road Main Gate, Opposite WACKBOARD College, Managiri, KK Nagar,Madurai',
            ratings:4,
            distance:'200m',
            facilities:['tasty pizzas','Beverages','Television','Premium wifi']
       },
       {
        name:'Madurai Bun Parotta Kadai ',
        address:'Madurai Bun Parotta Kadai Avin Signal, Managiri, KK Nagar, Tamil Nadu 625020',
        ratings:5,
        distance:'400m',
        facilities:['tasty parottas','Non-veg specials']
   }]
    });
};

/* GET loation page */
const locInfo = (req, res) => {
    res.render('location-info',
      {
        title: 'Hotel Sree Sabarees',
         pageHeader: {
          title: 'Finder',
        },
        sidebar: {
          context: 'is on Finder because it has accessible wifi and space to sit down with your laptop and get some work done.',
          callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
        },
        location: {
          name: 'Hotel Sree Sabarees',
          address: '1, Pankajam Colony, Kamarajar Salai, Tamil Nadu 625009',
          ratings: 4,
          facilities: ['Hot drinks','Foods and salads','Ice cream','Pure veg'],
          coords: { lng: 78.144920, lat: 9.913230},
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
              author: 'Harish',
              rating: 5,
              timestamp: '14 June 2018',
              reviewText: 'What a great place. I can\'t say enough good things about it.'
            },
            {
              author: 'Kishore',
              rating: 3,
              timestamp: '16 July 2018',
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


