import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

fetch("http://" + window.location.host + ":5000/todos")
	.then(response => response.json())
	.then(response => {
		ReactDOM.render(<App todos={response.todos} />, document.getElementById('root'));
	});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// fetch("http://" + window.location.host + ":5000/todos/3", { method: "GET" }).then(response => response.json())
// 	.then(response => {
// 		console.log(response);
// 	});

// fetch("http://" + window.location.host + ":5000/todos", { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: "Borstch", done: true }) }).then(response => response.json()).then(response => { console.log(response); });