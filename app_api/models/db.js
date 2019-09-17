const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://pkunal22:patel102515209>@cluster0-hqurn.gcp.mongodb.net/test?retryWrites=true&w=majority';

const readLine = require('readline');

mongoose.connect(dbURI, {useNewUrlParser: true, dbName: 'BookDB'});

mongoose.connection.on('connected', () =>{
    console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', err =>{
    console.log('Mongoose connection error: ', err);
});

mongoose.connection.on('disconnected', () =>{
    console.log('Mongoose disconnected');
});

if(process.platform === "win32"){
    const rl = readLine.createInterface ({
        input: process.stdin,
        output: process.stdout
    });
    rl.on ('SIGINT', () => {
        process.emit ("SIGINT");
    });
}

const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close( () => {
        console.log(`Mongoose disconnected through ${msg}`);
        callback();
    });
};

process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});

process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app shutdown', () => {
        process.exit(0);
    });
});

require('./book');
















// const mongoose = require('mongoose');

// const dbURI = 'mongodb+srv://pkunal22:patel102515209>@cluster0-hqurn.gcp.mongodb.net/test?retryWrites=true&w=majority';
// // const dbURIlog = 'mongodb://localhost/Loc8rLog';
// // const logDB = mongoose.createConnection(dbURIlog);
// mongoose.connect(dbURI, { useNewUrlParser: true }, { dbName: 'BookDB' });

// const readLine = require('readline');
// if (process.platform === 'win32') {
//     const rl = readLine.createInterface({
//         input: process.stdin,
//         output: process.stdout
//     });
//     rl.on('SIGINT', () => {
//         process.emit("SIGINT");
//     });
// }

// mongoose.connection.on('connected', () => {
//     console.log(`Mongoose connected to ${dbURI}`);
// });
// mongoose.connection.on('error', err => {
//     console.log('Mongoose connection error:', err);
// });
// mongoose.connection.on('disconnected', () => {
//     console.log('Mongoose disconnected');
// });

// const gracefulShutdown = (msg, callback) => {
//     mongoose.connection.close(() => {
//         console.log(`Mongoose disconnected through ${msg}`);
//         callback();
//     });
// };

// process.once('SIGUSR2', () => {
//     gracefulShutdown('nodemon restart', () => {
//         process.kill(process.pid, 'SIGUSR2');
//     });
// });
// process.on('SIGINT', () => {
//     gracefulShutdown('app termination', () => {
//         process.exit(0);
//     });
// });
// process.on('SIGTERM', () => {
//     gracefulShutdown('Heroku app shutdown', () => {
//         process.exit(0);
//     });
// });

// require("./book");