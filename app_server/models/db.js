const mongoose = require('mongoose');
const readLine = require('readline');

let dbURI = 'mongodb://localhost/finder';
if(process.env.NODE_ENV === 'production'){
    dbURI = process.env.MONGODB_URI;
}
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology:true});




/* Checks for a connection event */
mongoose.connection.on('connected',() => {
    console.log(`Mongoose connected to ${dbURI}`);
});

/* Checks for a error*/
mongoose.connection.on('error', err => { 
    console.log(`Mongoose connection error: ${err}`);
}); 

/* Checks for a disconnection event */
mongoose.connection.on('disconnected',() => {
    console.log('Mongoose disconnected'); 
});
 
/* This code emits the SIGINT signal on Windows machines, allowing you to capture it
and gracefully close down anything else you need to before the process ends. */
if(process.platform === 'win32'){
    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.on('SIGINT', () => { 
        process.emit ("SIGINT");
    });
}

const appShutdown = (msg, callback) => {
    mongoose.connection.close( ()=> {
        console.log(`Mongoose disconnected due to ${msg}`);
        callback();
    });
}

/* For nodemon restarts */
process.once('SIGUSR2', ()=>{
    appShutdown('nodemon restart',() => {
        process.kill(process.pid,'SIGUSR2');
    });
});
/* For app termination */
process.on('SIGINT', () => {
    appShutdown('app termination', () => {
        process.exit(0);
    });
});

/* For heroku app termination */
process.on('SIGTERM', () => {
    appShutdown('Heroku app shutdown', () => {
        process.exit(0);
    });
});

require('./location');






