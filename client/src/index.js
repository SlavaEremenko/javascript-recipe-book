import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import TimeTable from './TimeTable';
import * as serviceWorker from './serviceWorker';

// fetch("http://" + window.location.host + ":5000/todos")
// 	.then(response => response.json())
// 	.then(response => {
		// ReactDOM.render(<App todos={response.todos} />, document.getElementById('root'));
	// });

// ReactDOM.render(<App />, document.getElementById('root'));

const time_table = "---------------------------------------- Boil meat\n" +
  "--------------- Wash & peel vegetables\n" +
  "               ------ Cut & fry onion\n" +
  "                  ----- Cut beets, red pepper, tomatos\n" +
  "                     ---------- Heat beets, red pepper, tomatos\n" +
  "                        ---------- Dice potatoes, carrots, celery root, cabbage\n" +
  "                                        -- Take meat out, cut in pieces, add bay leaf & pepper\n" +
  "                                          -- Add salt, potatoes\n" +
  "                                            -- Add cabbage & kidney beans & carrots\n" +
  "                                              -- Add skillet with beets\n" +
  "                                                --- Add onion, meat & greens\n" +
  "                                                   -------------- Take off heat and place into cold water";
ReactDOM.render(<TimeTable data={time_table} />, document.getElementById('time-table'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// fetch("http://" + window.location.host + ":5000/todos/3", { method: "GET" }).then(response => response.json())
// 	.then(response => {
// 		console.log(response);
// 	});

// fetch("http://" + window.location.host + ":5000/todos", { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: "Borstch", done: true }) }).then(response => response.json()).then(response => { console.log(response); });