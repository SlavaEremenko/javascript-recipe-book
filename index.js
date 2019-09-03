const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const PORT = 5000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost/Todo", { useNewUrlParser: true });
let db = mongoose.connection;
db.once('open', () => console.log('connected to the database'));
// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const ToDo = mongoose.model('ToDo', { title: String, done: Boolean });

// Setup
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Display main page
app.get('/', (req, res) => res.render('pages/index'));
app.get('/todos', (req, res) => {
	// Find all and return the array
	ToDo.find({}, (error, docs) => {
		res.status(200).json({ todos: docs });
	});
});
app.post('/todos', (req, res) => {
	// Create and return new
	ToDo.create({
		title: req.body.title,
		done: !!req.body.done
	}, function(error, doc) {
		res.status(200).json(doc);
	});
});
app.patch('/todos/:id', (req, res) => {
	// Update checkmark for one Todo
	ToDo.updateOne({ _id: req.params.id }, { done: req.body.done }, (error, result) => {
		res.status(200).json(result);
	});
});
app.delete('/todos/:id', (req, res) => {
	// Delete Todo
	ToDo.deleteOne({ _id: req.params.id }, (error, result) => {
		res.status(200).json(result);
	});
});
// app.get('/todos/:id', (req, res) => {
// 	res.status(200).json({ title: "Go to The Store", done: true, id: req.params.id });
// });

// Start server
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));




// { title: "Go to The Store", done: true },
// { title: "Buy Ingredients", done: true },
// { title: "Cook borstch", done: false },
// { title: "Eat borstch", done: false }