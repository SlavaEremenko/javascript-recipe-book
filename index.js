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


// Routes
app.get('/', (req, res) => res.render('pages/index'));

app.get('/todos', (req, res) => {
	res.status(200).json({ todos: [
        { title: "Go to The Store", done: true },
        { title: "Buy Ingredients", done: true },
        { title: "Cook borstch", done: false },
        { title: "Eat borstch", done: false }
	]});
});

app.post('/todos', (req, res) => {
	console.log(req.body, req.params);
	// console.log(req.body, res);
	// console.log(req.params, req);
	// console.log(req.params.todo.title, req.params.todo.done);
	ToDo.create({
		title: req.body.title,
		done: !!req.body.done
	});
});

app.get('/todos/:id', (req, res) => {
	res.status(200).json({ title: "Go to The Store", done: true, id: req.params.id });
});

app.put('/todos/:id', (req, res) => {
	console.log(req, res);
});

app.delete('/todos/:id', (req, res) => {
	console.log(req.params.id);
});

// Start server
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));