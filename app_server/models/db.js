const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost/finder';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology:true});

/* Checks for a connection event */
mongoose.connection.on('connected',() => {
    console.log(`Mongoose connected to ${dbURI}`);
});

/* Checks for a error*/
mongoose.connection.on('error', err => { 
    console.log('Mongoose connection error:',err);
});

/* Checks for a disconnection event */
mongoose.connection.on('disconnected',() => {
    console.log('Mongoose disconnected'); 
});



