const mongoose = require('mongoose');
const express = require('express')
const path = require('path');
const PORT = 5000; //process.env.PORT || 5000;
const mongo_uri = process.env.MONGODB_URI || "mongodb://react-todo:R3alCompany@ds255107.mlab.com:55107/heroku_9rzk2vv0";

// Connect to MongoDB
mongoose.connect(mongo_uri, { useNewUrlParser: true });
let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));
// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Setup
var app = express();
app = app.use(express.static(path.join(__dirname, 'public')));
app = app.set('views', path.join(__dirname, 'views'));
app = app.set('view engine', 'ejs');

// Routes
app = app.get('/', (req, res) => res.render('pages/index'));

// Start server
app = app.listen(PORT, () => console.log(`Listening on ${ PORT }`));



// TODO: Build React UI using hooks
// Serve React UI using Express